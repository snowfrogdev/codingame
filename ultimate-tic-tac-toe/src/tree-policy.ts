import { MCTSNode } from "./mcts-node";
import { expand } from "./expand";
import { findBestChild } from "./best-child";

export function treePolicy(node: MCTSNode): MCTSNode {
  while (!node.isTerminal) {
    if (!node.isFullyExpanded) {
      return expand(node);
    } else {
      node = findBestChild(node, 1.414);
    }
  }
  return node;
}
