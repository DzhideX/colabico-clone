import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reducer from '../reducer/reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk,logger);

const store = createStore(reducer,composeEnhancers(middleware));

export default store;