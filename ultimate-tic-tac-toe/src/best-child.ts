import { MCTSNode } from "./mcts-node";

export function findBestChild(node: MCTSNode, exploitationParam: number): MCTSNode {
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