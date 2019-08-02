import { MCTSNode } from "./mcts-node";
import { applyAction } from "./apply-action";

export function expand(node: MCTSNode): MCTSNode {
  const action = node.chooseUntriedAction();
  const newState = applyAction(node.state, action);
  const newNode = new MCTSNode(newState, action);
  node.addChild(newNode);
  return newNode;
}
