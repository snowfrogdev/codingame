import { stateIsTerminal, spliceRandom } from "./utils";
import { getPossibleActions } from "./get-possible-actions";

export class MCTSNode {
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
