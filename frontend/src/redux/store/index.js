//--------------------------------------------
//:: IMPORTS FROM SAGA
//--------------------------------------------

import userIdSaga from '../saga/userIdSaga';
import listDataSaga from '../saga/listDataSaga';
import deleteListSaga from '../saga/deleteListSaga';
import todosSaga from '../saga/todosSaga';
import addTodoSaga from '../saga/addTodoSaga';
import deleteTodoSaga from '../saga/deleteTodoSaga';
import changeListNameSaga from '../saga/changeListNameSaga';
import setTodoStateSaga from '../saga/setTodoStateSaga';
import setTodoValueSaga from '../saga/setTodoValueSaga';
import addListSaga from '../saga/addListSaga';
import loginSaga from '../saga/loginSaga';
import signUpSaga from '../saga/signUpSaga';
import logOutSaga from '../saga/logOutSaga';
import reducer from '../reducer/reducer';

//--------------------------------------------
//:: IMPORTS FROM NPM PACKAGES
//--------------------------------------------

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

//--------------------------------------------
//:: SETTING UP ROOT REDUCER
//--------------------------------------------

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    reducer, // possible error?
  });

//--------------------------------------------
//:: SETUP OF THE MIDDLEWARE
//--------------------------------------------

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//--------------------------------------------
//:: SETUP OF THE STATE
//--------------------------------------------

// const store = createStore(reducer, composeEnhancers(middleware));

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), sagaMiddleware),
    ),
  );

  sagaMiddleware.run(userIdSaga);
  sagaMiddleware.run(listDataSaga);
  sagaMiddleware.run(deleteListSaga);
  sagaMiddleware.run(todosSaga);
  sagaMiddleware.run(addTodoSaga);
  sagaMiddleware.run(deleteTodoSaga);
  sagaMiddleware.run(changeListNameSaga);
  sagaMiddleware.run(setTodoStateSaga);
  sagaMiddleware.run(setTodoValueSaga);
  sagaMiddleware.run(addListSaga);
  sagaMiddleware.run(loginSaga);
  sagaMiddleware.run(signUpSaga);
  sagaMiddleware.run(logOutSaga);

  return store;
}

// export default store;
