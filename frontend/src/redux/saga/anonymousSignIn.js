import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function signInAnonymously() {
  return new Promise((resolve, reject) => {
    const email = uuidv4();
    const password = uuidv4();
    fetch('http://localhost:4000/anonymous', {
      method: 'POST',
      body: JSON.stringify({
        username: email,
        password,
        grant_type: 'password',
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic YXBwbGljYXRpb246a1huMnI1dTh4L0E/RChHK0tiUGVTaFZtWXEzdDZ2OXk=',
      },
    })
      .then(res => res.json())
      .then(response => {
        resolve('resolved');
        cookies.set('token', `anon ${response}`, {
          maxAge: 60 * 60 * 24 * 30 * 12, //one year, temporary solution
          path: '/',
        });
      });
  });
}

function* handleAnonymousSignIn(action) {
  try {
    yield call(signInAnonymously);
    yield put({
      type: 'ANONYMOUS_SIGN_IN_SUCCESS',
      payload: {
        status: 'success',
      },
    });
    yield put(push('/', '/'));
    yield put({ type: 'REQUEST_USER_ID' });
  } catch (e) {
    yield put({
      type: 'ANONYMOUS_SIGN_IN_FAILURE',
      payload: {
        status: 'failure',
      },
    });
  }
}

function* anonymousSignIn() {
  yield takeEvery('REQUEST_ANONYMOUS_SIGN_IN', handleAnonymousSignIn);
}

export default anonymousSignIn;
