import { put, takeEvery, call, all, select } from 'redux-saga/effects';
import { db } from '../../firebase/firebase';

function fetchListData(userId) {
  let Arr = [];
  return new Promise((resolve, reject) => {
    db.collection(`users/${userId}/lists`)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach((doc, i) => {
          db.collection(`users/${userId}/lists/${doc.id}/todos`)
            .get()
            .then(snapshotTwo => {
              let tempObj = {
                name: doc.data() ? doc.data().name : '',
                lastTodo: snapshotTwo.docs[snapshotTwo.docs.length - 1]
                  ? snapshotTwo.docs[snapshotTwo.docs.length - 1].data().value
                  : '',
                numberOfTodos: snapshotTwo.docs.length,
                id: doc.id,
              };
              Arr.push(tempObj);
            })
            .then(() => {
              if (Arr.length === snapshot.docs.length) {
                resolve(Arr);
              }
            });
        });
      });
  });
}

function* handleLoadListData(action) {
  try {
    let response = yield call(fetchListData, action.payload);
    yield put({
      type: 'SET_LIST_DATA_SUCCESS',
      payload: {
        listData: response,
        status: 'success',
      },
    });
  } catch (e) {
    yield put({
      type: 'SET_LIST_DATA_FAILURE',
      payload: {
        status: 'failure',
      },
    });
  }
}

function* listDataSaga() {
  yield takeEvery('REQUEST_LIST_DATA', handleLoadListData);
}

export default listDataSaga;
