import { all } from 'redux-saga/effects';
import { loadUserSaga, loginSaga, registerSaga, authErrorSaga } from './authSagas';

export default function* saga() {
  yield all([
    loadUserSaga(),
    loginSaga(),
    registerSaga(),
    authErrorSaga(),
  ]);
}
