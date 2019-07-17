import axios from 'axios';
import { put, call } from 'redux-saga/effects';

import { generateAction } from './actions';
import api from '../api';

export const putAction = (action, payload) => put(generateAction(action, payload));
export const callApi = (method, ...args) => call(api[method], ...args);

const AUTH_TOKEN_STORAGE_KEY = 'ABEZRODNOV_BLOG_AUTH_TOKEN';

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

export const setAuthToken = token => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  }
  setRequestHeaderAuthToken(token);
};

export const setRequestHeaderAuthToken = token => {
  axios.defaults.headers.common['x-auth-token'] = token;
};