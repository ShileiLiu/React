import {createStore, applyMiddleware, compose} from 'redux';
import reducer from '../reducers/index';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
const logger = createLogger();

const router = routerMiddleware(browserHistory);

let store = createStore(reducer,)
export default store;