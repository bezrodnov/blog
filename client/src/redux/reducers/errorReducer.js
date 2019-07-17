import { SET_ERROR, CLEAR_ERROR } from '../actions';

const initialState = {
  message: null,
  status: null,
  id: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return {
        message: action.payload.message,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERROR:
      return initialState;
    default:
      return state;
  }
}
