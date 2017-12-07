import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect } from 'react-redux'



import './index.css';
import Game from './containers/Game';
import store from './store';


ReactDOM.render(
    <Provider store={store}>
    <Game/>
    </Provider>,
    document.getElementById('root'));