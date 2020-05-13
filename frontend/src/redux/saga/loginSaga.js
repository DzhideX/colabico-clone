import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function login({ email, password }) {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/login', {
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
      .then(response => {
        if (response.status >= 400) {
          console.log('Failure!');
          reject('rejected');
        } else {
          return response.json();
        }
      })
      .then(token => {
        cookies.set('token', token, {
          maxAge: 60 * 60 * 24 * 30 * 12, //one year, temporary solution
          path: '/',
        });
        resolve('resolved');
      });
  });
}

function* handleLogin(action) {
  try {
    let response = yield call(login, action.payload);
    if (response === 'resolved') {
      yield put({
        type: 'LOGIN_SUCCESS',
        payload: {
          status: 'success',
        },
      });
      yield put({ type: 'REQUEST_USER_ID' });
      yield put(push('/'));
    }
  } catch (e) {
    yield put({
      type: 'LOGIN_FAILURE',
      payload: {
        status: 'failure',
      },
    });
  }
}

function* loginSaga() {
  yield takeEvery('REQUEST_LOGIN', handleLogin);
}

export default loginSaga;
