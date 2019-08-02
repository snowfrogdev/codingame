import { hasWon, metaGameIsDraw, testBit23 } from "./utils";

export function applyAction(state: State, action: Action): State {
  const newState: State = new Int32Array(state);
  const playerIsX = testBit23(newState);
  let binaryAction = 1 << action[1];
  if (playerIsX) {
    binaryAction <<= 9;
  }
  newState[action[0]] |= binaryAction;

  // Flip player flag
  newState[0] ^= 0x800000; //bit 23;

  // Reset nextBoard bits
  newState[0] &= ~(0b1111 << 19);
  // Set nextBoard bits
  newState[0] |= action[1] << 19;

  if (isDraw(newState[action[0]])) {
    // Set closed flag on smallboard
    newState[action[0]] |= 1 << 18;
    // Set appropriate drawn flag on meta board
    newState[9] |= (1 << 18) << action[0];
  } else if (hasWon(newState[action[0]], playerIsX)) {
    // Set appropriate won flag on meta board
    if (playerIsX) {
      newState[9] |= (1 << 9) << action[0];
    } else {
      newState[9] |= 1 << action[0];
    }

    // Set closed flag on smallboard
    newState[action[0]] |= 1 << 18;
  }

  // Check if meta game is a draw and set appropriate bit (24)
  if (metaGameIsDraw(state)) {
    newState[0] |= 1 << 24;
  }
  // Check if meta game has been won and set appropriate bit (24)
  else if (hasWon(newState[9], playerIsX)) {
    newState[0] |= 1 << 24;
  }

  return newState;
}

function isDraw(smallBoard: number): boolean {
  return ((smallBoard | (smallBoard >>> 9)) & 511) === 511;
}
