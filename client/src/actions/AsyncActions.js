import * as actions from './Actions'

export const creds = { credentials: 'same-origin' };

export function fetchPeople() {
  return dispatch => {
    return fetch('/api/people', creds).
      then(response => response.json()).
      then(people => dispatch(actions.receivePeople(people)));
  }
}

export function fetchEmailCharacterCounts() {
  return dispatch => {
    return fetch('/api/email_character_counts', creds).
      then(response => response.json()).
      then(characterCounts => dispatch(actions.receiveCharacterCounts(characterCounts)));
  }
}

export function fetchDuplicateEmailAddresses() {
  return dispatch => {
    return fetch('/api/possible_duplicate_email_addresses', creds).
      then(response => response.json()).
      then(duplicates => dispatch(actions.receiveDuplicateEmailAddresses(duplicates)));
  }
}