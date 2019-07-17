import { takeLatest } from 'redux-saga/effects';
import {
  putAction, putError, callApi, getAuthToken, setAuthToken,
  setRequestHeaderAuthToken,
} from '../utils';
import {
  LOAD_USER, USER_LOADED, AUTH_ERROR,
  LOGIN, LOGIN_SUCCESS,
  REGISTER, REGISTER_SUCCESS, REGISTER_FAIL,
  SET_ERROR,
} from '../actions';

export function* loadUserSaga() {
  yield takeLatest(LOAD_USER, function* () {
    try {
      const token = getAuthToken();
      if (!token) {
        // if there is no token - skip further requests to the server
        yield putAction(AUTH_ERROR);
        return;
      }

      setRequestHeaderAuthToken(token);
      const response = yield callApi('loadUser');
      const user = response.data;
      yield putAction(USER_LOADED, { ...user, token });
    } catch (error) {
      yield putError(AUTH_ERROR, error);
    }
  });
}

export function* authErrorSaga() {
  yield takeLatest(AUTH_ERROR, function* (action) {
    if (window.location.pathname !== '/auth') {
      yield window.location.pathname = '/auth';
    }
    const { message } = action.payload;
    if (message) {
      yield putAction(SET_ERROR, { message, id: 'AUTH_ERROR' });
    }
  });
}

export function* loginSaga() {
  yield takeLatest(LOGIN, function* (action) {
    try {
      const response = yield callApi('login', action.payload);
      const { user, token } = response.data;
      setAuthToken(token);
      yield putAction(LOGIN_SUCCESS);
      yield putAction(USER_LOADED, { ...user, token });
      window.location.pathname = '/';
    } catch (error) {
      yield putError(AUTH_ERROR, error);
    }
  });
}

export function* registerSaga() {
  yield takeLatest(REGISTER, function* (action) {
    try {
      const response = yield callApi('register', action.payload);
      const { user, token } = response.data;
      setAuthToken(token);
      yield putAction(REGISTER_SUCCESS);
      window.location.pathname = '/';
      yield putAction(USER_LOADED, { ...user, token });
    } catch (error) {
      yield putError(REGISTER_FAIL, error);
    }
  });
}

export function* registerFailSaga() {
  yield takeLatest(REGISTER_FAIL, function* (action) {
    const { message } = action.payload;
    if (message) {
      yield putAction(SET_ERROR, { message, id: 'REGISTER_ERROR' });
    }
  });
}