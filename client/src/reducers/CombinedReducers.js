import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { people } from './People';
import { characterCounts } from './CharacterCounts';

const Reducers = combineReducers({
  router: routerReducer,
  people,
  characterCounts
});

export default Reducers