import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect } from 'react-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';

import './index.css';
import Game from './containers/Game';

const mathReducer = (state = {
    result: 1,
    lastValues: [],
}, action) => {
    switch (action.type) {
        case "ADD":
            state = {
                ...state,
                result: state.result + action.payload,
                lastValues: [...state.lastValues, action.payload]
            };
            break;
        case "SUBTRACT":
            state = {
                ...state,
                result: state.result - action.payload,
                lastValues: [...state.lastValues, action.payload]
            };
            break;
        default:
            state = {...state}

    }
    return state;
};



const store = createStore(combineReducers({mathReducer}), {}, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
    <Game/>
    </Provider>,
    document.getElementById('root'));