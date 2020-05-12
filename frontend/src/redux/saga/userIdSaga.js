import { put, takeEvery, call } from 'redux-saga/effects';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function fetchUser() {
  return new Promise((resolve, reject) => {
    const tokenValue = cookies.get('token');
    fetch('http://localhost:4000/authorize', {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.statusCode >= 400) {
          reject('rejected');
        } else {
          resolve(data.userId);
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
