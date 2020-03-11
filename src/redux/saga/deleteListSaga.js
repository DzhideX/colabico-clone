import { put, takeEvery, call, all, select } from 'redux-saga/effects';
import { db } from '../../firebase/firebase';

function deleteList(list) {
  return new Promise((resolve, reject) => {
    db.collection(`users/${list.userId}/lists`)
      .doc(list.key)
      .delete()
      .then(() => {
        resolve(list.data.filter(filterList => filterList.id !== list.key));
      })
      .catch(err => {
        reject(err);
      });
  });
}

function* handleDeleteList(action) {
  try {
    let response = yield call(deleteList, action.payload);
    yield put({
      type: 'DELETE_LIST_DATA_SUCCESS',
      payload: {
        listData: response,
        status: 'success',
      },
    });
  } catch (e) {
    yield put({
      type: 'DELETE_LIST_DATA_FAILURE',
      payload: {
        status: 'failure',
      },
    });
  }
}

function* deleteListSaga() {
  yield takeEvery('REQUEST_DELETE_LIST', handleDeleteList);
}

export default deleteListSaga;
