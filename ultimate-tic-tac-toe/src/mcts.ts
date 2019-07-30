import { performance } from 'perf_hooks';

/**
 * ```
 * State
 * Index 9      : Meta board - 0b0_0_0000_000000000_000000000.
 * Index 0 - 8  : Small boards - 0b0_000000000_000000000.
 * bit 23       : 1 = Game Over, 0 = Game Not Over. // Only for index 9.
 * bit 22       : 1 = Player X to play, 0 = Player O to play. // Only for index 9.
 * bits 21 - 18 : Index of valid board for next move, in binary. If > 8 allboards valid. / Only for index 9.
 * bit 18       : 1 = Board is closed / Only for index 0-8.
 * bits 17 - 9  : Position of X tokens. / Small boards X wins.
 * bits 8 - 0   : Position of O tokens. / Small boards O wins.
 * ```
 */
type State = Int32Array;

/**
 * ```
 * Action
 * 0: Board index
 * 1: Position index
 * ```
 */
type Action = Int8Array;

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

function uctSearch(state: State): Action {
  const startTime = performance.now();
  const rootNode = new MCTSNode(state);
  while (performance.now() - startTime < 100) {
    const newNode = treePolicy(rootNode);
    const reward = defaultPolicy(newNode.state);
    backupNegaMax(newNode, reward);
  }
  const bestChild = findBestChild(rootNode, 0);
  return deduceAction(rootNode.state, bestChild.state);
}

function treePolicy(node: MCTSNode): MCTSNode {
  while (!node.isTerminal) {
    if (!node.isFullyExpanded) {
      return expand(node);
    } else {
      node = findBestChild(node, 1.414);
    }
  }
  return node;
}

function expand(node: MCTSNode): MCTSNode {}

function findBestChild(node: MCTSNode, exploitationParam: number): MCTSNode {}

function defaultPolicy(state: State): number {}

function backupNegaMax(node: MCTSNode, reward: number): void {}

function deduceAction(startState: State, EndState: State): Action {}

class MCTSNode {
  private possibleActionsLeftToExpand = [];
  private visits_ = 0;
  private reward_ = 0;
  constructor(readonly state: State) {}

  get isTerminal(): boolean {}

  get isFullyExpanded(): boolean {
    return this.possibleActionsLeftToExpand.length === 0;
  }
}

// TODO: Test this function
function getPossibleActions(state: State): Action[] {
  const boardIndex = (state[9] >>> 18) & 15; //?
  const actions: Action[] = []
  // If it's the game's first move or the smallboard is closed
  // All boards are open to play
  if (boardIndex > 8 || (state[boardIndex] & (1 << 17))) {
    for (let i = 0; i < 9; i++) {
      // Check if board is not closed
      if (!(state[i] & (1 << 17))) {
        actions.concat(getSmallBoardActions(state, boardIndex));
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

function applyAction(state: State, action: Action): State {
  const newState: State = new Int32Array(state);
  const playerIsX = newState[9] & 0x400000; //bit 22;
  let binaryAction = 1 << action[1];
  if (playerIsX) {
    binaryAction <<= 9;
  }
  newState[action[0]] |= binaryAction;

  // Flip player flag
  newState[9] ^= 0x400000; //bit 22;

  // Reset nextBoard bits
  newState[9] &= ~(0b1111 << 18)
  // Set nextBoard bits
  newState[9] |= action[1] << 18;

  if (isDraw(newState[action[0]])) {
    // Set closed flag on smallboard
    newState[action[0]] |= 1 << 18;
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

  return newState;
}


const board = [
  0b0_000000000_000000000,
  0b0_000000000_000000011,
  0b0_001000100_000000001,
  0b0_000000000_000000000,
  0b0_000000000_000000000,
  0b0_000000000_000000000,
  0b0_000000000_000000000,
  0b0_000000000_000000000,
  0b0_000000000_000000000,
  0b0_0_0010_000000000_000000000
];
const state: State = new Int32Array(board);

const action: Action = new Int8Array([1, 2]);

state;

getPossibleActions(state); //?

applyAction(state, action)[9].toString(2) //?

function isDraw(smallBoard: number): boolean {
  return ((smallBoard | (smallBoard >>> 9)) & 511) === 511;
}

// Player X > 0, Player O = 0
function hasWon(smallBoard: number, player: number): boolean {
  for (const win of WINS) {
    if (player) {
      if ((smallBoard & (win << 9)) === win << 9) return true;
    } else {
      if ((smallBoard & win) === win) return true;
    }
  }
  return false;
}
