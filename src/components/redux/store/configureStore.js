import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {reducers} from '../reducers/index';

export function configureStore() {
  //return createStore(reducers, initialState, applyMiddleware(thunk));
  // const loggerMiddleware = createLogger();
  return createStore(reducers, {}, applyMiddleware(thunk, /* loggerMiddleware */));
};