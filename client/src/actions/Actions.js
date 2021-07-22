import * as actions from './Constants'

export function receivePeople(people) {
  return {
    type: actions.RECEIVE_PEOPLE,
    people
  }
}