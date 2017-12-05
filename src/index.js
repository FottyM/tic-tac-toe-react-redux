import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect } from 'react-redux'
import { createStore } from 'redux'

import './index.css';
import Game from './Game';


ReactDOM.render(<Game/>, document.getElementById('root'));