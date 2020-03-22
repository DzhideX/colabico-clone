import { put, takeEvery, call, all, select } from 'redux-saga/effects';
import { db } from '../../firebase/firebase';

function setTodoValue({ userId, listId, todoId, value }) {
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:4000/user/${userId}/list/${listId}/todo/${todoId}/value/${value}`,
      {
        method: 'PUT',
      },
    )
      .then(res => res.json())
      .then(response => {
        resolve(response);
      });
  });
}

function* handleSetTodoValue(action) {
  try {
    let { todoId, value } = yield call(setTodoValue, action.payload);
    yield put({
      type: 'SET_TODO_VALUE_SUCCESS',
      payload: {
        todoId,
        value,
        status: 'success',
      },
    });
  } catch (e) {
    yield put({
      type: 'SET_TODO_VALUE_FAILURE',
      payload: {
        status: 'failure',
      },
    });
  }
}

function* setTodoValueSaga() {
  yield takeEvery('REQUEST_SET_TODO_VALUE', handleSetTodoValue);
}

export default setTodoValueSaga;
