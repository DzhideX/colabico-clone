import { put, takeEvery, call, all, select } from 'redux-saga/effects';
import { db } from '../../firebase/firebase';

function deleteTodo({ userId, listId, key }) {
  console.log(key);
  return new Promise((resolve, reject) => {
    db.collection(`users/${userId}/lists/${listId}/todos`)
      .doc(key)
      .delete()
      .then(() => {
        resolve(key);
      })
      .catch(e => {
        reject(e);
      });
  });
}

function* handleDeleteTodo(action) {
  try {
    let response = yield call(deleteTodo, action.payload);
    console.log(response);
    yield put({
      type: 'DELETE_TODO_SUCCESS',
      payload: {
        key: response,
        status: 'success',
      },
    });
  } catch (e) {}
}

function* deleteTodoSaga() {
  yield takeEvery('REQUEST_DELETE_TODO', handleDeleteTodo);
}

export default deleteTodoSaga;
