import { put, takeEvery, call } from 'redux-saga/effects';

function addTodo({ userId, listId, todoValue }) {
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:4000/user/${userId}/list/${listId}/todo/${todoValue}`,
      { method: 'POST' },
    )
      .then(res => res.json())
      .then(response => {
        console.log(response);
        resolve(response);
      });
  });
}

function* handleAddTodo(action) {
  console.log(action);
  try {
    let response = yield call(addTodo, action.payload);
    yield put({
      type: 'ADD_TODO_SUCCESS',
      payload: {
        todo: response,
        status: 'success',
      },
    });
  } catch (e) {
    yield put({
      type: 'ADD_TODO_FAILURE',
      payload: {
        status: 'failure',
      },
    });
  }
}

function* addTodoSaga() {
  yield takeEvery('REQUEST_ADD_TODO', handleAddTodo);
}

export default addTodoSaga;
