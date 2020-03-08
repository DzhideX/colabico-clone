import { put, takeEvery, call, all, select } from 'redux-saga/effects';
import { db } from '../../firebase/firebase';
import { push, goForward, replace } from 'connected-react-router';

function addList({ userId, value, name }) {
  return new Promise((resolve, reject) => {
    if (name) {
      db.collection(`users/${userId}/lists`)
        .add({ name: name })
        .then(docRef => {
          resolve({
            type: 'name',
            name,
            location: `/l/${docRef.id}`,
          });
        });
    } else if (value) {
      db.collection(`users/${userId}/lists`)
        .add({ name: '0' })
        .then(docRef => {
          db.collection(`users/${userId}/lists/${docRef.id}/todos`)
            .add({
              value: value,
              state: 'pending',
            })
            .then(({ id }) => {
              resolve({
                type: 'todo',
                value,
                id,
                location: `/l/${docRef.id}`,
              });
            });
        });
    }
  });
}

function* handleAddList(action) {
  //   console.log(action);
  try {
    let response = yield call(addList, action.payload);
    if (response.type === 'todo') {
      yield put({
        type: 'ADD_LIST_SUCCESS',
        payload: {
          type: 'todo',
          status: 'success',
          todo: {
            state: 'pending',
            value: response.value,
            id: response.id,
          },
        },
      });
    } else if (response.type === 'name') {
      yield put({
        type: 'ADD_LIST_SUCCESS',
        payload: {
          type: 'name',
          status: 'success',
          listName: response.name,
        },
      });
    }
    yield put(push(response.location));
  } catch (e) {}
}

function* addListSaga() {
  yield takeEvery('REQUEST_ADD_LIST', handleAddList);
}

export default addListSaga;
