import { put, takeEvery, call, all, select } from 'redux-saga/effects';
import { db } from '../../firebase/firebase';

function fetchTodos({ userId, listId }) {
  return new Promise((resolve, reject) => {
    if (userId) {
      fetch(`http://localhost:4000/user/${userId}/list/${listId}/todos`)
        .then(res => res.json())
        .then(response => {
          resolve(response);
        });
    } else {
      fetch(`http://localhost:4000/list/${listId}/todos`)
        .then(res => res.json())
        .then(response => {
          resolve(response);
        });
    }
  });
}

function* handleFetchTodos(action) {
  try {
    let { todos, name } = yield call(fetchTodos, action.payload);
    yield put({
      type: 'GET_TODO_DATA_SUCCESS',
      payload: {
        todos,
        name,
      },
    });
  } catch (e) {
    yield put({
      type: 'GET_TODO_DATA_FAILURE',
      payload: {
        status: 'failure',
      },
    });
  }
}

function* todosSaga() {
  yield takeEvery('REQUEST_TODO_DATA', handleFetchTodos);
}

export default todosSaga;
