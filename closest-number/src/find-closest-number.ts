export function findClosestNumber(N: string, M: string) {
  // const maxLength = Math.max(N.length, M.length);
  // N.padStart(maxLength, "0");
  // M.padStart(maxLength, "0");

  let resultArray: string[] = M.split("").sort((a, b) => Number(b) - Number(a));
  if (N.length > M.length) {
  } else if (N.length < M.length) {
    resultArray = M.split("").sort((a, b) => Number(a) - Number(b));
  } else {
    const result = recurse(N, resultArray);
    let resultString = result[0];
    if ( resultString == N){
      resultArray = [...result[0]];
    } else
    {
    if (result[1]) {
      resultString = (N[0] ? N[0] : "") + result[0];
    } else {
      resultString = result[0];
    }
  }

    resultArray = resultString.split("");
  }

  const x: number | undefined = resultArray.findIndex(x => x !== "0");
  const index: number = x ? x : 0;

  resultArray = resultArray.slice(index);

  const result: string = resultArray.join(""); //?
  return result;
}

function recurse(
  N: string,
  resultArray: string[],
  index = 0,
  currentPrefix = ""
): [string, boolean] {

  const currentDigit = N[index];

  if (!N.length) {
    return ["", true];
  }

  if (resultArray.includes(currentDigit)) {
    
    const result = recurse(
      N.slice(index + 1),
      resultArray,
      index++,
      currentPrefix + currentDigit
    );
    if (result[1]) {
      return [(currentDigit ? currentDigit : "") + result[0], true];
    }
    return [result[0], false];
  } else {
    // compare higher and lower to N to see which one is closest and return that
    const nextHigherNumber: string = getHigherNumber(currentDigit, resultArray);
    const nextLowerNumber: string = getLowerNumber(currentPrefix, currentDigit, resultArray);
    const BigN = BigInt(currentPrefix + N);
    const HigherDiff = BigInt(nextHigherNumber) - BigN;
    const LowerDiff = BigN - BigInt(nextLowerNumber);
    return HigherDiff > LowerDiff
      ? [nextLowerNumber, false]
      : [nextHigherNumber, false];
  }
}

export function getHigherNumber(char: string, resultArray: string[]): string {
  let workingArray = [...resultArray];
  const startIndex = workingArray.findIndex(x => x <= char) - 1;
  const startNumber = workingArray.splice(startIndex, 1)[0];
  workingArray.sort((a, b) => Number(a) - Number(b));
  return startNumber + workingArray.join("");
}

export function getLowerNumber(
  currentPrefix:string, 
  char: string, resultArray: string[]): string {
  let workingArray = [...resultArray];
  workingArray = removeCharactersFromString(workingArray,currentPrefix);
  const startIndex = workingArray.findIndex(x => x < char);
  const startNumber = workingArray.splice(startIndex, 1)[0];
  workingArray.sort((a, b) => Number(b) - Number(a));
  return currentPrefix + startNumber + workingArray.join("");
}

// TOOD by Phil
export function removeCharactersFromString(charArray:string[], charactersToRemove:string)
{
  [...charactersToRemove].forEach(char => {
    const index = charArray.indexOf(char)
    charArray.splice(index, 1);
  })
  return charArray;
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
