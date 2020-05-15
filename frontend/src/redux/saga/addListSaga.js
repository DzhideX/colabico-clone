import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';

function addList({ userId, value, name }) {
  return new Promise((resolve, reject) => {
    if (name === '' || name) {
      fetch(`http://localhost:4000/user/${userId}/?listname=${name}`, {
        method: 'POST',
      })
        .then(res => res.json())
        .then(response => {
          resolve(response);
        });
    } else if (value) {
      fetch(`http://localhost:4000/user/${userId}/listvalue/${value}`, {
        method: 'POST',
      })
        .then(res => res.json())
        .then(response => {
          resolve(response);
        });
    }
  });
}

function* handleAddList(action) {
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
  } catch (e) {
    yield put({
      type: 'ADD_LIST_FAILURE',
      payload: {
        type: 'name',
        status: 'failure',
      },
    });
  }
}

function* addListSaga() {
  yield takeEvery('REQUEST_ADD_LIST', handleAddList);
}

export default addListSaga;
