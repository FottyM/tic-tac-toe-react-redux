import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import  thunk from 'redux-thunk'

import turnsReducer from './reducers/turnsReducer'

export default createStore(
    combineReducers({turnsReducer}),
    {},
    applyMiddleware(logger, thunk)
);