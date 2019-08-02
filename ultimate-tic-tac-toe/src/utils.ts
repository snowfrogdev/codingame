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

export function stateIsTerminal(state: State): boolean {
  if ((state[0] >>> 24) & 1) {
    return true;
  }
  return false;
}

export function metaGameIsDraw(state: Int32Array) {
  return ((((state[9] | (state[9] >>> 18)) & 511) | (state[9] >>> 9)) & 511) === 511;
}

// Player X > 0, Player O = 0
export function hasWon(smallBoard: number, player: number): boolean {
  for (const win of WINS) {
    if (player) {
      if ((smallBoard & (win << 9)) === win << 9) return true;
    } else {
      if ((smallBoard & win) === win) return true;
    }
  }
  return false;
}

const WINS = new Int16Array([
  0b000000111,
  0b000111000, // 3 rows
  0b111000000,
  0b100100100,
  0b010010010, // 3 columns
  0b001001001,
  0b100010001, // 2 diagonals
  0b001010100
]);

// Returns 0 if player is O, otherwise player is X
export function testBit23(state: Int32Array) {
  return state[0] & 0x800000; // bit 23
}