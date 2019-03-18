import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from './welcome';
import App from './app';


//redux
import {Provider} from 'react-redux';
import {reduxPromise} from 'redux-promise';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers.js';
import store from './store.js'


let elem;

elem = <Provider store={store}><App /></Provider>



ReactDOM.render(elem, document.querySelector('main'));
