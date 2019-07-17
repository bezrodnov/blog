import { takeLatest } from 'redux-saga/effects';
import { putAction, callApi, getAuthToken, setAuthToken, setRequestHeaderAuthToken } from '../utils';
import { 
  LOAD_USER, USER_LOADED, AUTH_ERROR,
  LOGIN, LOGIN_SUCCESS, LOGIN_FAIL,
  REGISTER, REGISTER_SUCCESS, REGISTER_FAIL,
} from '../actions';

export function* loadUserSaga() {
  yield takeLatest(LOAD_USER, function*() {
    try {
      const token = getAuthToken();
      if (!token) {
        // if there is no token - skip further requests to the server
        yield putAction(AUTH_ERROR);
        return;
      }
  
      setRequestHeaderAuthToken(token);
      const user = yield callApi('loadUser');
      if (!user || !user.id) {
        yield putAction(AUTH_ERROR, { message: user.message });
        setAuthToken();
        return;
      }
      yield putAction(USER_LOADED, { ...user, token });
    } catch (error) {
      yield putAction(AUTH_ERROR);
    }
  });
}

export function* loginSaga() {
  yield takeLatest(LOGIN, function*(action) {
    try {
      const response = yield callApi('login', action.data);
      const { user, token } = response;
      setAuthToken(token);
      yield putAction(LOGIN_SUCCESS);
      yield putAction(USER_LOADED, { ...user, token });
      window.location.pathname = '/';
    } catch (error) {
      yield putAction(LOGIN_FAIL);
    }
  });
}

export function* registerSaga() {
  yield takeLatest(REGISTER, function*(action) {
    try {
      const response = yield callApi('register', action.data);
      const { user, token } = response;
      setAuthToken(token);
      yield putAction(REGISTER_SUCCESS);
      window.location.pathname = '/';
      yield putAction(USER_LOADED, { ...user, token });
    } catch (error) {
      yield putAction(REGISTER_FAIL);
    }
  });
}

export function* authErrorSaga() {
  yield takeLatest(AUTH_ERROR, function*() {
    if (window.location.pathname !== '/auth') {
      window.location.pathname = '/auth';
    }
  });
}