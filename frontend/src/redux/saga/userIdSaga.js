import { put, takeEvery, call, all, select } from 'redux-saga/effects';
import { firebase } from '../../firebase/firebase';

function fetchUser() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        resolve(user.uid);
      } else {
        reject('error');
      }
    });
  });
}

function* handleLoadUserId(action) {
  try {
    let response = yield call(fetchUser);
    yield put({
      type: 'SET_USER_ID_SUCCESS',
      payload: {
        userId: response,
        status: 'success',
      },
    });
  } catch (e) {
    yield put({
      type: 'SET_USER_ID_FAILURE',
      payload: {
        userId: '',
        status: 'failed',
      },
    });
  }
}

function* userIdSaga() {
  yield takeEvery('REQUEST_USER_ID', handleLoadUserId);
}

export default userIdSaga;
