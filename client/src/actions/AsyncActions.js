import * as actions from './Actions'

export const creds = { credentials: 'same-origin' };

export function fetchPeople() {
  return dispatch => {
    return fetch('/api/people', creds).
      then(response => response.json()).
      then(people => dispatch(actions.receivePeople(people)));
  }
}