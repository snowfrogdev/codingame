/**
 * A function that return a random whole number between
 * `min` and `max`.
 * @hidden
 * @internal
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const getRandomIntInclusive = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
};

/**
 * A function that removes and returns a random element from an `arrray`.
 * @hidden
 * @internal
 * @template T
 * @param {T[]} array
 * @returns {T}
 */
export const spliceRandom = <T>(array: T[]): T => {
  const index = getRandomIntInclusive(0, array.length - 1);
  return array.splice(index, 1)[0];
};
