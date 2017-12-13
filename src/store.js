import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import  thunk from 'redux-thunk'

import turnsReducer from './reducers/turnsReducer'
import singlePlayerReducer from './reducers/singlePlayerReducer'

export default createStore(
    combineReducers({turnsReducer, singlePlayerReducer}),
    {},
    applyMiddleware(logger, thunk)
);