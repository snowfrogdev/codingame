export function findClosestNumber(N: string, M: string) {
  // const maxLength = Math.max(N.length, M.length);
  // N.padStart(maxLength, "0");
  // M.padStart(maxLength, "0");

  let resultArray: string[]
  if (N.length > M.length) {
    resultArray = M.split("")
      .sort((a, b) => Number(b) - Number(a));      
  } else if(N.length < M.length)
  {
    resultArray = M.split("")
    .sort((a, b) => Number(a) - Number(b));
  }
  else
  {
    resultArray = [];
    
    
  }

  const x: number | undefined = resultArray.findIndex((x) => x !== "0" );
  const index: number = x ? x: 0;

  resultArray = resultArray.slice(index);

  const result: string = resultArray.join(""); //?
  return result;
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
