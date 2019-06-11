import {
  GET_DEPARTMENTS,
  ADD_DEPARTMENT,
  DELETE_DEPARTMENT,
  DEPARTMENTS_LOADING
} from "../actions/types";

const initialState = {
  departments: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
        loading: false
      };
    case DELETE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments.filter(a => a._id !== action.payload)
      };
    case ADD_DEPARTMENT:
      return {
        ...state,
        departments: [action.payload, ...state.departments]
      };
    case DEPARTMENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
