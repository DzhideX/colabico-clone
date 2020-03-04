import { put, takeEvery, call, all, select } from 'redux-saga/effects';
import { db } from '../../firebase/firebase';

function setTodoState({ userId, listId, todoId, desiredState }) {
  return new Promise((resolve, reject) => {
    db.collection(`users/${userId}/lists/${listId}/todos`)
      .doc(todoId)
      .set({ state: desiredState }, { merge: true })
      .then(() => {
        resolve({ todoId, desiredState });
      });
  });
}

function* handleUpdateTodoState(action) {
  console.log(action);
  try {
    let { todoId, desiredState } = yield call(setTodoState, action.payload);
    yield put({
      type: 'SET_TODO_STATE_SUCCESS',
      payload: {
        todoId,
        desiredState,
        status: 'success',
      },
    });
  } catch (e) {}
}

function* setTodoStateSaga() {
  yield takeEvery('REQUEST_SET_TODO_STATE', handleUpdateTodoState);
}

export default setTodoStateSaga;
