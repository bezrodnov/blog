import axios from "axios";
import {
  GET_ANTIBIOTIC_TYPES,
  ADD_ANTIBIOTIC_TYPE,
  DELETE_ANTIBIOTIC_TYPE,
  ANTIBIOTIC_TYPES_LOADING
} from "./types";

export const getAntibioticTypes = () => dispatch => {
  dispatch(setAntibioticTypesLoading());
  axios
    .get("/api/antibioticTypes")
    .then(res =>
      dispatch({
        type: GET_ANTIBIOTIC_TYPES,
        payload: res.data
      })
    )
    .catch(e => {
      // TODO: error processing
      console.error(e);
    });
};

export const deleteAntibioticType = id => dispatch => {
  axios
    .delete(`api/antibioticTypes/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_ANTIBIOTIC_TYPE,
        payload: id
      });
    })
    .catch(e => {
      // TODO: error processing
      console.error(e);
    });
};

export const addAntibioticType = antibioticType => dispatch => {
  axios
    .post("/api/antibioticTypes", antibioticType)
    .then(res => {
      dispatch({
        type: ADD_ANTIBIOTIC_TYPE,
        payload: res.data
      });
    })
    .catch(e => {
      // TODO: error processing
      console.error(e);
    });
};

export const setAntibioticTypesLoading = () => {
  return {
    type: ANTIBIOTIC_TYPES_LOADING
  };
};
