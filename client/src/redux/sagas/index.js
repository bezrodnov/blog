import { all } from 'redux-saga/effects';
import {
  loadUserSaga, loginSaga, authErrorSaga,
  registerSaga, registerFailSaga,
} from './authSagas';

export default function* saga() {
  yield all([
    loadUserSaga(),
    authErrorSaga(),
    loginSaga(),
    registerSaga(),
    registerFailSaga(),
  ]);
}
