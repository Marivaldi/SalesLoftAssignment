import { RECEIVE_CHARACTER_COUNTS } from "../actions/Constants";

export function characterCounts (
    state=[],
    action
  ) {
    switch(action.type) {
      case RECEIVE_CHARACTER_COUNTS:
        return [...action.characterCounts];
      default:
        return state
    }
  }