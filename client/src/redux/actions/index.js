export const GET_USER = 'GET_USER';
export const FETCHED_USER = 'FETCHED_USER';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const generateAction = (type, payload) => ({ type, payload });