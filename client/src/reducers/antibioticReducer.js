import {
  GET_ANTIBIOTICS,
  ADD_ANTIBIOTIC,
  DELETE_ANTIBIOTIC,
  ANTIBIOTICS_LOADING
} from "../actions/types";

const initialState = {
  antibiotics: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ANTIBIOTICS:
      return {
        ...state,
        antibiotics: action.payload,
        loading: false
      };
    case DELETE_ANTIBIOTIC:
      return {
        ...state,
        antibiotics: state.antibiotics.filter(a => a._id !== action.payload)
      };
    case ADD_ANTIBIOTIC:
      return {
        ...state,
        antibiotics: [action.payload, ...state.antibiotics]
      };
    case ANTIBIOTICS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
