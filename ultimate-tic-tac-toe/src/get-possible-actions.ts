export function getPossibleActions(state: State): Action[] {
  const boardIndex = (state[0] >>> 19) & 15;
  const actions: Action[] = [];
  // If it's the game's first move or the smallboard is closed
  // All boards are open to play
  if (boardIndex > 8 || state[boardIndex] & (1 << 18)) {
    //Iterate through each small board
    for (let i = 0; i < 9; i++) {
      // Check if board is not closed
      if (!(state[i] & (1 << 18))) {
        actions.push(...getSmallBoardActions(state, i));
      }
    }
    return actions;
  }

  return getSmallBoardActions(state, boardIndex);
}

function getSmallBoardActions(state: Int32Array, boardIndex: number): Action[] {
  const actions: Action[] = [];
  let board = (state[boardIndex] | (state[boardIndex] >>> 9)) & 511;
  let index = 0;
  while (index <= 8) {
    if ((board & 1) === 0) {
      actions.push(new Int8Array([boardIndex, index]));
    }
    index++;
    board >>= 1;
  }
  return actions;
}