import {
  LOAD_USER,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../actions';

import { getAuthToken } from '../utils';

const initialState = {
  token: getAuthToken(),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER:
    case LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGOUT:
    case REGISTER_FAIL:
      return {
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
