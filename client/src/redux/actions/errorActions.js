import { SET_ERROR, CLEAR_ERROR, generateAction } from '.';

const DEFAULT_MESSAGE = 'Something went wrong. Please try again later';

export const setError = (message = DEFAULT_MESSAGE) => generateAction(SET_ERROR, { message });
export const clearError = () => generateAction(CLEAR_ERROR);