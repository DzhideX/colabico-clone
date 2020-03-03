import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import userIdSaga from '../saga/userIdSaga';
import listDataSaga from '../saga/listDataSaga';
import deleteListSaga from '../saga/deleteListSaga';
import todosSaga from '../saga/todosSaga';
import addTodoSaga from '../saga/addTodoSaga';

import reducer from '../reducer/reducer';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const middleware = applyMiddleware(thunk) //logger
const middleware = applyMiddleware(thunk, sagaMiddleware); //logger

const store = createStore(reducer, composeEnhancers(middleware));

sagaMiddleware.run(userIdSaga);
sagaMiddleware.run(listDataSaga);
sagaMiddleware.run(deleteListSaga);
sagaMiddleware.run(todosSaga);
sagaMiddleware.run(addTodoSaga);

export default store;
