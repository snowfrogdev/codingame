import { performance } from 'perf_hooks';
import { spliceRandom, getRandomIntInclusive } from './utils';

/**
 * ```
 * State
 * Index 9      : Meta board - 0b000000000_000000000_000000000.
 * Index 0 - 8  : Small boards - 0b0_0_0000_0_000000000_000000000.
 * bit 24       : 1 = Game Over, 0 = Game Not Over. // Only for index 0.
 * bit 23       : 1 = Player X to play, 0 = Player O to play. // Only for index 0.
 * bits 22 - 19 : Index of valid board for next move, in binary. If > 8 allboards valid. / Only for index 0.
 * bit 18       : 1 = Board is closed / Only for index 0-8.
 * bit 26 - 18  : Drawn small boards. / Only for index 9.
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
  // Player X > 0, Player O = 0
  const player = testBit23(state);
  const startTime = performance.now();
  const rootNode = new MCTSNode(state, null);
  while (performance.now() - startTime < 100) {
    const newNode = treePolicy(rootNode);
    const reward = defaultPolicy(newNode.state, player);
    backupNegaMax(newNode, reward);
  }
  return findBestChild(rootNode, 0).action!;
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

function expand(node: MCTSNode): MCTSNode {
  const action = node.chooseUntriedAction();
  const newState = applyAction(node.state, action);
  const newNode = new MCTSNode(newState, action);
  node.addChild(newNode);
  return newNode;
}

// TODO: test this function once we have implemented Default Policy & Backup Negamax
function findBestChild(node: MCTSNode, exploitationParam: number): MCTSNode {
  const children = [...node.children];
  const sumChildrenVisits = children.reduce((sum, child) => sum + child.visits, 0);

  const bestChild = children.reduce(
    (bestChildSoFar: { score: number; node: MCTSNode }, child) => {
      const childScore = computeUCB1Score(child, sumChildrenVisits, exploitationParam);
      if (bestChildSoFar.score > childScore) {
        return bestChildSoFar;
      } else if (bestChildSoFar.score < childScore) {
        return { score: childScore, node: child };
      }
      if (Math.random() >= 0.5) {
        return bestChildSoFar;
      }
      return { score: childScore, node: child };
    },
    { score: -Infinity, node: undefined! }
  );

  return bestChild.node;
}

function computeUCB1Score(
  child: MCTSNode,
  sumChildrenVisits: number,
  explorationParam: number
): number {
  const exploitationTerm = child.reward / child.visits;
  const explorationTerm = Math.sqrt(Math.log(sumChildrenVisits) / child.visits);
  return exploitationTerm + explorationParam * explorationTerm;
}

// TODO: Test this function
function defaultPolicy(state: State, player: number): number {
  while (!stateIsTerminal(state)) {
    const possibleActions = getPossibleActions(state);
    const index = getRandomIntInclusive(0, possibleActions.length - 1);
    const action = possibleActions[index];
    state = applyAction(state, action);
  }

  if (hasWon(state[9], player)) {
    return 1;
  } else if (metaGameIsDraw(state)) {
    return 0;
  }
  return -1;
}

function backupNegaMax(node: MCTSNode, reward: number): void {}

class MCTSNode {
  private possibleActionsLeftToExpand: Action[] = [];
  private children_: MCTSNode[] = [];
  readonly visits = 0;
  readonly reward = 0;
  constructor(readonly state: State, readonly action: Action | null) {
    this.possibleActionsLeftToExpand = getPossibleActions(this.state);
  }

  get children(): IterableIterator<MCTSNode> {
    return this.children_.values();
  }

  get isTerminal(): boolean {
    return stateIsTerminal(this.state);
  }

  get isFullyExpanded(): boolean {
    return this.possibleActionsLeftToExpand.length === 0;
  }

  addChild(childNode: MCTSNode): void {
    this.children_.push(childNode);
  }

  chooseUntriedAction(): Action {
    return spliceRandom(this.possibleActionsLeftToExpand);
  }
}

function stateIsTerminal(state: State): boolean {
  if ((state[0] >>> 24) & 1) {
    return true;
  }
  return false;
}

function getPossibleActions(state: State): Action[] {
  const boardIndex = (state[0] >>> 19) & 15; //?
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

function applyAction(state: State, action: Action): State {
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

function metaGameIsDraw(state: Int32Array) {
  return ((((state[9] | (state[9] >>> 18)) & 511) | (state[9] >>> 9)) & 511) === 511;
}

// Returns 0 if player is O, otherwise player is X
function testBit23(newState: Int32Array) {
  return newState[0] & 0x800000; // bit 23
}

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

/*************************************************************************/

const board = [
  0b1_0_0001_0_000000000_000000000,
  0b0_000000000_000000000,
  0b0_000000010_000000000,
  0b0_000000000_000000000,
  0b0_000000000_000000000,
  0b0_000000000_000000000,
  0b0_000000000_000000000,
  0b0_000000000_000000000,
  0b0_000000000_000000000,
  0b000000000_000000000_000000000
];
const state: State = new Int32Array(board);

const action: Action = new Int8Array([2, 1]);

state;

// getPossibleActions(state) //?

// applyAction(state, action)[0].toString(2); //?

// const node = new MCTSNode(state)

const node = new MCTSNode(state, action);

while (!node.isFullyExpanded) {
  expand(node);
}

findBestChild(node);
