import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';

function signup({ email, password }) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:4000/signup`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(response => {
      if (response.status >= 400) {
        reject('rejected');
      } else {
        resolve('resolved');
      }
    });
  });
}

function* handleSignUp(action) {
  try {
    let response = yield call(signup, action.payload);
    if (response === 'resolved') {
      yield put({
        type: 'SIGNUP_SUCCESS',
        payload: {
          status: 'success',
        },
      });
      yield put(push('/login'));
    }
  } catch (e) {
    yield put({
      type: 'SIGNUP_FAILURE',
      payload: {
        status: 'failure',
      },
    });
  }
}

function* signUpSaga() {
  yield takeEvery('REQUEST_SIGNUP', handleSignUp);
}

export default signUpSaga;
