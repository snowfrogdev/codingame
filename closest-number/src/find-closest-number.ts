export function findClosestNumber(N: string, M: string) {
  // const maxLength = Math.max(N.length, M.length);
  // N.padStart(maxLength, "0");
  // M.padStart(maxLength, "0");

  let resultArray: string[] = M.split("").sort((a, b) => Number(b) - Number(a));
  if (N.length > M.length) {
  } else if (N.length < M.length) {
    resultArray = M.split("").sort((a, b) => Number(a) - Number(b));
  } else {
    resultArray = recurse(N, resultArray).split("");
  }

  const x: number | undefined = resultArray.findIndex(x => x !== "0");
  const index: number = x ? x : 0;

  resultArray = resultArray.slice(index);

  const result: string = resultArray.join(""); //?
  return result;
}

function recurse(N: string, resultArray: string[], index = 0): string {
  if (!N.length) {
    return "";
  }

  if (resultArray.includes(N[index])) {
    return N[index] + recurse(N.slice(index + 1), resultArray, index++); // When recurse returns nextHigher or nextLower we are still addin N[Index] and we shouldn't
  } else {
    // compare higher and lower to N to see which one is closest and return that
    const nextHigherNumber: string = getHigherNumber(N[index], resultArray);
    const nextLowerNumber: string = getLowerNumber(N[index], resultArray);
    const BigN = BigInt(N);
    const HigherDiff = BigInt(nextHigherNumber) - BigN;
    const LowerDiff = BigN - BigInt(nextLowerNumber);
    return HigherDiff > LowerDiff ? nextLowerNumber : nextHigherNumber;
  }
}

export function getHigherNumber(char: string, resultArray: string[]): string {
  let workingArray = [...resultArray];
  const startIndex = workingArray.findIndex(x => x <= char) - 1;
  const startNumber = workingArray.splice(startIndex, 1)[0];
  workingArray.sort((a, b) => Number(a) - Number(b));
  return startNumber + workingArray.join("");
}

export function getLowerNumber(char: string, resultArray: string[]): string {
  let workingArray = [...resultArray];
  const startIndex = workingArray.findIndex(x => x < char);
  const startNumber = workingArray.splice(startIndex, 1)[0];
  workingArray.sort((a, b) => Number(b) - Number(a));
  return startNumber + workingArray.join("");
}

/*

const N = "45284";
const M = "17404";

// Check if we can find a digit 1 higher
  // Generate the smallest number with that starting digit

// Check if we can find a digit 1 smaller
  // Generate the biggest number with that starting digit

// Check if we can find the same digit
  //




const actual = "44710";

// findClosestNumber('13123', '1647')
*/
