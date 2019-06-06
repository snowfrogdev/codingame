import {
  findClosestNumber,
  getHigherNumber,
  getLowerNumber,
  removeCharactersFromString
} from "./find-closest-number";

describe("closest number", () => {
  describe("codingame tests", () => {
    test("M has fewer digits", () => {
      const N = "94754";
      const M = "3841";

      const expected = findClosestNumber(N, M);

      const actual = "8431";

      expect(expected).toBe(actual);
    });

    test("M has more digits", () => {
      const N = "2749";
      const M = "284512";

      const expected = findClosestNumber(N, M);

      const actual = "122458";

      expect(expected).toBe(actual);
    });

    test("Exact solution", () => {
      const N = "123";
      const M = "231";

      const expected = findClosestNumber(N, M);

      const actual = "123";

      expect(expected).toBe(actual);
    });

    test("Solution with leading zeros", () => {
      const N = "111";
      const M = "3204";

      const expected = findClosestNumber(N, M);

      const actual = "234";

      expect(expected).toBe(actual);
    });

    test("Same number of digits, solution < N", () => {
      const N = "45284";
      const M = "17404";

      const expected = findClosestNumber(N, M);

      const actual = "44710";

      expect(expected).toBe(actual);
    });
  });

  describe("personal tests", () => {
    test("getHigherNumber", () => {
      const N = "45284";
      const M = "17404";

      const resultArray = M.split("").sort((a, b) => Number(b) - Number(a));
      const actual = getHigherNumber("4", resultArray);

      const expected = "70144";

      expect(actual).toBe(expected);
    });

    test("getLowerNumber", () => {
      const N = "45284";
      const M = "17404";

      const resultArray = M.split("").sort((a, b) => Number(b) - Number(a));
      const actual = getLowerNumber("4", "5", resultArray);

      const expected = "44710";

      expect(actual).toBe(expected);
    });

    test("removeCharactersFromString", () => {
      const charArray = ['1', '4', '6', '8', '9','9']
      const toRemove = '189'


      const actual = removeCharactersFromString(charArray, toRemove)

      const expected = ["4", "6", "9"];

      expect(actual).toEqual(expected);
    });
  });
});
