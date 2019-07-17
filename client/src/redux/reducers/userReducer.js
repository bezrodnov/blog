import { FETCHED_USER } from '../actions';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCHED_USER:
      return { user: action.payload };
    default:
      return state;
  }
};

export default userReducer;