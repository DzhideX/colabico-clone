import { put, takeEvery, call, all, select } from 'redux-saga/effects';
import { db } from '../../firebase/firebase';

function fetchTodos({ userId, listId }) {
  return new Promise((resolve, reject) => {
    let todos = [];
    if (userId) {
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
    } else {
      db.collection('users')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            db.collection(`users/${doc.id}/lists`)
              .get()
              .then(res => {
                res.forEach(re => {
                  if (re.id === listId) {
                    console.log('found it!');
                    db.collection(`users/${doc.id}/lists/${re.id}/todos`)
                      .get()
                      .then(querySnapshot => {
                        querySnapshot.docs.forEach(doc => {
                          if (doc.exists) {
                            // console.log({ ...doc.data(), id: doc.id });
                            todos.push({ ...doc.data(), id: doc.id });
                          }
                        });
                        resolve({
                          name: re.data().name,
                          todos,
                        });
                      });
                  }
                });
              });
          });
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
