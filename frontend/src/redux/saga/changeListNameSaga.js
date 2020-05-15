import { put, takeEvery, call } from 'redux-saga/effects';

function changeListName({ userId, listId, value }) {
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:4000/user/${userId}/list/${listId}/?name=${value}`,
      {
        method: 'PUT',
      },
    )
      .then(res => res.json())
      .then(response => {
        resolve(response);
      });
  });
}

function* handleChangeListName(action) {
  try {
    let response = yield call(changeListName, action.payload);
    yield put({
      type: 'CHANGE_LIST_NAME_SUCCESS',
      payload: {
        name: response,
        status: 'success',
      },
    });
  } catch (e) {
    yield put({
      type: 'CHANGE_LIST_NAME_FAILURE',
      payload: {
        status: 'failure',
      },
    });
  }
}

function* changeListNameSaga() {
  yield takeEvery('REQUEST_CHANGE_LIST_NAME', handleChangeListName);
}

export default changeListNameSaga;
