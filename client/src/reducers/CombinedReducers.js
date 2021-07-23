import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { people } from './People';
import { characterCounts } from './CharacterCounts';
import { duplicateEmails } from './DuplicateEmails';

const Reducers = combineReducers({
  router: routerReducer,
  people,
  characterCounts,
  duplicateEmails
});

export default Reducers