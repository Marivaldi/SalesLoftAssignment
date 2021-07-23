import * as actions from './Constants'

export function receivePeople(people) {
  return {
    type: actions.RECEIVE_PEOPLE,
    people
  }
}

export function receiveCharacterCounts(characterCounts) {
  return {
    type: actions.RECEIVE_CHARACTER_COUNTS,
    characterCounts
  }
}