import { performance } from 'perf_hooks';

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

function getPossibleActions(state: State): Action[] {
  const boardIndex = (state[0] >>> 18) & 15; //?
}

function applyAction(state: State, action: Action): State {
  const newState: State = new Int32Array(state);
  const playerIsX = newState[0] & 0x400000; //bit 22;
  let binaryAction = 1 << action[1];
  if (playerIsX) {
    binaryAction <<= 9;
  }
  newState[action[0]] |= binaryAction;

  // Flip player flag
  newState[0] ^= 0x400000; //bit 22;

  // Set nextBoard bits
  newState[0] |= action[1] << 18;

  // Update MetaBoard
  if (isDraw(newState[action[0]])) {
    newState[9] |= (1 << 18) << action[0];
  }
  if (hasWon(newState[action[0]], playerIsX)) {
    if (playerIsX) {
      newState[9] |= (1 << 9) << action[0]
    } else {
      newState[9] |= 1 << action[0]
    }
  }

  return newState;
}

/**
 * ```
 * Board
 * Index 9      : Meta board - 0b000000000_000000000_000000000.
 * Index 0 - 8  : Small boards - 0b000000000_000000000.
 * bit 23       : 1 = Game Over, 0 = Game Not Over. // Only for index 0.
 * bit 22       : 1 = Player X to play, 0 = Player O to play. // Only for index 0.
 * bits 21 - 18 : Index of valid board for next move, in binary. If > 8 allboards valid. / Only for index 0.
 * bits 26 - 18 : Small boards draws. / Only for index 9.
 * bits 17 - 9  : Position of X tokens. / Small boards X wins.
 * bits 8 - 0   : Position of O tokens. / Small boards O wins.
 * ```
 */
const board = [
  0b0_1_0000_000000000_000000000,
  0b000000011_001010000,
  0b000000000_000000000,
  0b000000000_000000000,
  0b000000000_000000000,
  0b000000000_000000000,
  0b000000000_000000000,
  0b000000000_000000000,
  0b000000000_000000000,
  0b000000000_000000000_000000000
];
const state = new Int32Array(board);

const action: Action = new Int8Array([1, 2]);

state;

getPossibleActions(state); //?

applyAction(state, action) //?

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
