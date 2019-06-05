import { findClosestNumber } from "./find-closest-number";

describe("closest number", () => {
  test("M has fewer digits", () => {
    const N = "94754";
    const M = "3841";

    const expected = findClosestNumber(N, M);

    const actual = "8431";

    expect(expected).toBe(actual)
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
