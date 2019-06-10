import {
  GET_ANTIBIOTIC_TYPES,
  ADD_ANTIBIOTIC_TYPE,
  DELETE_ANTIBIOTIC_TYPE,
  ANTIBIOTIC_TYPES_LOADING
} from "../actions/types";

const initialState = {
  antibioticTypes: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ANTIBIOTIC_TYPES:
      return {
        ...state,
        antibioticTypes: action.payload,
        loading: false
      };
    case DELETE_ANTIBIOTIC_TYPE:
      return {
        ...state,
        antibioticTypes: state.antibioticTypes.filter(
          a => a._id !== action.payload
        )
      };
    case ADD_ANTIBIOTIC_TYPE:
      return {
        ...state,
        antibioticTypes: [action.payload, ...state.antibioticTypes]
      };
    case ANTIBIOTIC_TYPES_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
