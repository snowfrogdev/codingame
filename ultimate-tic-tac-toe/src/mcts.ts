import { performance } from 'perf_hooks';
import { defaultPolicy } from './default-policy';
import { treePolicy } from './tree-policy';
import { backupNegaMax } from './backup';
import { findBestChild } from './best-child';
import { MCTSNode } from './mcts-node';
import { testBit23 } from './utils';

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
