import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { firebase } from '../../firebase/firebase';

function login({ email, password }) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function() {
        return firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            resolve('resolved');
          });
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
