import { put, takeEvery, call, all, select } from 'redux-saga/effects';
import { db } from '../../firebase/firebase';

function fetchTodos({ userId, listId }) {
  return new Promise((resolve, reject) => {
    let todos = [];
    db.collection(`users/${userId}/lists/${listId}/todos`)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          if (doc.exists) {
            // console.log({ ...doc.data(), id: doc.id });
            todos.push({ ...doc.data(), id: doc.id });
          }
        });
        db.collection(`users/${userId}/lists`)
          .doc(listId)
          .get()
          .then(querySnapshotTwo => {
            resolve({ name: querySnapshotTwo.data().name, todos });
          });
      });
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
  } catch (e) {}
}

function* todosSaga() {
  yield takeEvery('REQUEST_TODO_DATA', handleFetchTodos);
}

export default todosSaga;
