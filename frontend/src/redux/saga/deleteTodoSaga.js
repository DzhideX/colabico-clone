import { put, takeEvery, call } from 'redux-saga/effects';

function deleteTodo({ userId, listId, key }) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:4000/user/${userId}/list/${listId}/todo/${key}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(response => {
        resolve(response);
      });
  });
}

function* handleDeleteTodo(action) {
  try {
    let response = yield call(deleteTodo, action.payload);
    yield put({
      type: 'DELETE_TODO_SUCCESS',
      payload: {
        key: response,
        status: 'success',
      },
    });
  } catch (e) {
    yield put({
      type: 'DELETE_TODO_FAILURE',
      payload: {
        status: 'failure',
      },
    });
  }
}

function* deleteTodoSaga() {
  yield takeEvery('REQUEST_DELETE_TODO', handleDeleteTodo);
}

export default deleteTodoSaga;
