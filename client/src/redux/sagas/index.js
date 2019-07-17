import { all } from 'redux-saga/effects';
import {
  loadUserSaga, loginSaga, authErrorSaga,
  registerSaga, registerFailSaga, logoutSaga,
} from './authSagas';

export default function* saga() {
  yield all([
    loadUserSaga(),
    authErrorSaga(),
    loginSaga(),
    registerSaga(),
    registerFailSaga(),
    logoutSaga(),
  ]);
}
