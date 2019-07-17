import { all } from 'redux-saga/effects';
import { getUserSaga } from './userSagas';

export default function* saga() {
  yield all([
    getUserSaga(),
  ]);
}
