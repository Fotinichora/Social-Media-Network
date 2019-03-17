import {createStore, applyMiddleware} from 'redux';
import reduxPromise from 'redux-promise';

import reducer from './reducers.js';

const store = createStore(reducer, applyMiddleware(reduxPromise));

export default store;
