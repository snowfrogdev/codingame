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

/**
 * ```
 * Board
 * Index 0      : 0b0_0000_000000000_000000000
 * Index 1 - 8  : 0b000000000_000000000
 * bit 22       : 1 = Player X to play, 0 = Player O to play.
 * bits 21 - 18 : Index of valid board for next move, in binary. If > 8 allboards valid.
 * bits 17 - 9  : Position of X tokens.
 * bits 8 - 0   : Position of O tokens.
 * ```
 */
const board = [
  0b1_0000_000000000_000000000,
  0b000000000_000000000,
  0b000000000_000000000,
  0b000000000_000000000,
  0b000000000_000000000,
  0b000000000_000000000,
  0b000000000_000000000,
  0b000000000_000000000,
  0b000000000_000000000
];

const action: Action = new Int8Array([8, 4]);

const state = new Int32Array(board);
const bits = state[0];
((bits | (bits >> 9)) & 511).toString(2); //?

function getPossibleActions(state: State): Action[] {
  const boardIndex = (state[0] >> 18) & 15; //?
}

function applyAction(state: State, action: Action): State {
  const newState: State = new Int32Array(state);
  const playerIsX = newState[0] & 0x400000;
  let binaryAction = 1 << action[1];
  if (playerIsX) {
    binaryAction <<= 9;
  }
  newState[action[0]] |= binaryAction;

  // Flip player flag
  newState[0] ^= 0x400000;

  // Set nextBoard bits
  newState[0] |= action[0] << 18;

  return newState;
}
state;

getPossibleActions(state); //?

applyAction(state, action); //?
