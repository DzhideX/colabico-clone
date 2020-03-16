import { put, takeEvery, call, all, select } from 'redux-saga/effects';
import { db } from '../../firebase/firebase';

function addTodo({ userId, listId, todoValue }) {
  let addedTodo = {
    value: todoValue,
    state: 'pending',
  };
  return new Promise((resolve, reject) => {
    db.collection(`users/${userId}/lists/${listId}/todos`)
      .add(addedTodo)
      .then(docRef => {
        resolve({ ...addedTodo, id: docRef.id });
      })
      .catch(e => {
        reject(e);
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