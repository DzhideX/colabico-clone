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
      .then(() => {
        resolve(addedTodo);
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
  } catch (e) {}
}

function* addTodoSaga() {
  yield takeEvery('REQUEST_ADD_TODO', handleAddTodo);
}

export default addTodoSaga;
