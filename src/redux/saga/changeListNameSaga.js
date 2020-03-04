import { put, takeEvery, call, all, select } from 'redux-saga/effects';
import { db } from '../../firebase/firebase';

function changeListName({ userId, listId, value }) {
  return new Promise((resolve, reject) => {
    db.collection(`users/${userId}/lists`)
      .doc(listId)
      .set({ name: value })
      .then(() => {
        resolve(value);
      })
      .catch(e => {
        reject(e);
      });
  });
}

function* handleChangeListName(action) {
  try {
    let response = yield call(changeListName, action.payload);
    console.log(response);
    yield put({
      type: 'CHANGE_LIST_NAME_SUCCESS',
      payload: {
        name: response,
        status: 'success',
      },
    });
  } catch (e) {}
}

function* changeListNameSaga() {
  yield takeEvery('REQUEST_CHANGE_LIST_NAME', handleChangeListName);
}

export default changeListNameSaga;
