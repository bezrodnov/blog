import { takeLatest, call, put } from 'redux-saga/effects';

import api from '../../api';
import { GET_USER } from '../actions';
import userActions from '../actions/userActions';
import { setError } from '../actions/errorActions';

function* getUser() {
  try {
    const user = yield call(api.getUser);
    yield put(userActions.fetchedUser(user));
  } catch (error) {
    yield put(setError());
  }
}

export function* getUserSaga() {
  yield takeLatest(GET_USER, getUser);
}