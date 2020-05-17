import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function logout() {
  return new Promise((resolve, reject) => {
    const token = cookies.get('token');
    if (token.split(' ')[0] === 'anon') {
      cookies.remove('token');
      fetch('http://localhost:4000/deleteAnonymous', {
        method: 'POST',
        body: JSON.stringify({
          token: token.split(' ')[1],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        if (response.status >= 400) {
          reject('rejected');
        } else {
          resolve('resolved');
        }
      });
    } else {
      cookies.remove('token');
      fetch('http://localhost:4000/deleteToken', {
        method: 'POST',
        body: JSON.stringify({
          token,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        if (response.status >= 400) {
          reject('rejected');
        } else {
          resolve('resolved');
        }
      });
    }
  });
}

function* handleLogOut(action) {
  try {
    let response = yield call(logout);
    if (response === 'resolved') {
      yield put({
        type: 'LOGOUT_SUCCESS',
        payload: {
          status: 'success',
        },
      });
      yield put({ type: 'REQUEST_USER_ID' });
      yield put(push('/'));
    }
  } catch (e) {
    yield put({
      type: 'LOGOUT_FAILURE',
      payload: {
        status: 'failure',
      },
    });
  }
}

function* logOutSaga() {
  yield takeEvery('REQUEST_LOGOUT', handleLogOut);
}

export default logOutSaga;
