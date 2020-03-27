import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { firebase, db } from '../../firebase/firebase';

function signup({ email, password }) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        db.collection(`users`)
          .doc(res.user.uid)
          .set({ state: 'user' });
        resolve('resolved');
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
      yield put({ type: 'REQUEST_USER_ID' });
      yield put(push('/'));
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
