export function findClosestNumber(N: string, M: string): string {
  if (N.length > M.length) {
    return biggestPossible(M);
  }

  M = removeSomeZeroes(M, N);

  if (N.length < M.length) {
    return smallestPossible(M);
  }

  return recurse([...N], [...M]);
}

function biggestPossible(M: string): string {
  return [...M].sort(descending).join("");
}

function removeSomeZeroes(M: string, N: string) {
  const zeroesToRemove: number = M.length - N.length;
  if (zeroesToRemove > 0) {
    M = removeZeroes(M, zeroesToRemove);
  }
  return M;
}

function removeZeroes(M: string, zeroesToRemove: number) {
  const arr = [...M].sort(ascending);
  const numberOfZeroesInArr = arr.findIndex(char => char !== "0");
  arr.splice(0, Math.min(zeroesToRemove, numberOfZeroesInArr));
  M = arr.join("");
  return M;
}

function smallestPossible(M: string): string {
  return [...M].sort(ascending).join("");
}

const descending = (a: string, b: string) => Number(b) - Number(a);
const ascending = (a: string, b: string) => Number(a) - Number(b);

function recurse(N: string[], M: string[], result = ""): string {
  const current = N[0];
  if (!current) {
    return result;
  }

  const higher = getHigher(current, M);
  const lower = getLower(current, M);
  let same = "";

  if (M.includes(current)) {
    const index = M.indexOf(current);
    same = recurse(N.slice(1), M, M.splice(index, 1)[0]);
  }

  return result + getSmallestDelta(N, higher, lower, same);
}

function getHigher(current: string, M: string[]): string {
  const workingM = [...M];
  let index = workingM.sort(ascending).findIndex(x => x > current);
  if (index < 0) {
    return "";
  }
  const start: string = workingM.splice(index, 1)[0];
  return start + workingM.join("");
}

function getLower(current: string, M: string[]): string {
  const workingM = [...M];
  let index = workingM.sort(descending).findIndex(x => x < current);
  if (index < 0) {
    return "";
  }
  const start: string = workingM.splice(index, 1)[0];
  return start[0] + workingM.join("");
}

function getSmallestDelta(
  N: string[],
  higher: string,
  lower: string,
  same: string
): string {
  const { higherDelta, lowerDelta, sameDelta } = computeDeltas(
    N,
    higher,
    lower,
    same
  );

  if (higherDelta < lowerDelta && higherDelta < sameDelta) {
    return higher;
  }
  if (lowerDelta <= higherDelta && lowerDelta <= sameDelta) {
    return lower;
  }
  return same;
}

function computeDeltas(
  N: string[],
  higher: string,
  lower: string,
  same: string
) {
  const numberOfN = BigInt(N.join(""));
  const higherDelta = higher ? BigInt(higher) - numberOfN : Infinity;
  const lowerDelta = lower ? numberOfN - BigInt(lower) : Infinity;
  const sameDelta = same ? bigIntAbs(BigInt(same) - numberOfN) : Infinity;
  return { higherDelta, lowerDelta, sameDelta };
}

function bigIntAbs(bigInt: bigint): bigint {
  return bigInt < 0 ? -bigInt : bigInt;
}

