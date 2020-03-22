import { put, takeEvery, call, all, select } from 'redux-saga/effects';
import { db } from '../../firebase/firebase';

function setTodoState({ userId, listId, todoId, desiredState }) {
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:4000/user/${userId}/list/${listId}/todo/${todoId}/state/${desiredState}`,
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

function* handleUpdateTodoState(action) {
  try {
    let { todoId, desiredState } = yield call(setTodoState, action.payload);
    yield put({
      type: 'SET_TODO_STATE_SUCCESS',
      payload: {
        todoId,
        desiredState,
        status: 'success',
      },
    });
  } catch (e) {
    yield put({
      type: 'SET_TODO_STATE_FAILURE',
      payload: {
        status: 'failure',
      },
    });
  }
}

function* setTodoStateSaga() {
  yield takeEvery('REQUEST_SET_TODO_STATE', handleUpdateTodoState);
}

export default setTodoStateSaga;
