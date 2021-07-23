import { RECEIVE_DUPLICATE_EMAILS } from "../actions/Constants";

export function duplicateEmails (
    state=[],
    action
  ) {
    switch(action.type) {
      case RECEIVE_DUPLICATE_EMAILS:
        return [...action.duplicateEmails];
      default:
        return state
    }
  }