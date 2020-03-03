import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import userIdSaga from '../saga/userIdSaga';
import listDataSaga from '../saga/listDataSaga';

import reducer from '../reducer/reducer';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const middleware = applyMiddleware(thunk) //logger
const middleware = applyMiddleware(thunk, sagaMiddleware); //logger

const store = createStore(reducer, composeEnhancers(middleware));

sagaMiddleware.run(userIdSaga);
sagaMiddleware.run(listDataSaga);

export default store;
