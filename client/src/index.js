import './global.css'

import React from "react";
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware } from 'redux';
import App from './components/App'
import Reducers from './reducers/CombinedReducers'

import createHistory from 'history/createBrowserHistory'

import { fetchDuplicateEmailAddresses, fetchEmailCharacterCounts, fetchPeople } from './actions/AsyncActions'

const history = createHistory()
const middlewares = [thunkMiddleware, routerMiddleware(history)]
let store = createStore(Reducers, applyMiddleware(...middlewares))

window.store = store

// bootstrap state
store.dispatch(fetchPeople());
store.dispatch(fetchEmailCharacterCounts());
store.dispatch(fetchDuplicateEmailAddresses());

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);