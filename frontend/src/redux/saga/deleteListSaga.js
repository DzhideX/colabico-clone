import { put, takeEvery, call } from 'redux-saga/effects';

function deleteList(list) {
  console.log(list);
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:4000/user/${list.userId}/list/${list.key}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(response => {
        resolve(list.data.filter(filterList => filterList.id !== response));
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
