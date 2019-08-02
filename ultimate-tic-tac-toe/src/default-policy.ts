import { applyAction } from "./apply-action";
import { stateIsTerminal, getRandomIntInclusive, hasWon, metaGameIsDraw } from "./utils";
import { getPossibleActions } from "./get-possible-actions";

export function defaultPolicy(state: State, player: number): number {
  while (!stateIsTerminal(state)) {
    const possibleActions = getPossibleActions(state); //?
    const index = getRandomIntInclusive(0, possibleActions.length - 1); //?
    const action = possibleActions[index];
    state = applyAction(state, action);
  }

  state; //?
  if (hasWon(state[9], player)) {
    return 1;
  } else if (metaGameIsDraw(state)) {
    return 0;
  }
  return -1;
}
