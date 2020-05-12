import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function logout({ userAnonymous, userId }) {
  return new Promise((resolve, reject) => {
    cookies.remove('token');
    resolve('resolved');
  });
}

function* handleLogOut(action) {
  try {
    let response = yield call(logout, action.payload);
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
