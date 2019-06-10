import axios from "axios";
import {
  GET_ANTIBIOTICS,
  ADD_ANTIBIOTIC,
  DELETE_ANTIBIOTIC,
  ANTIBIOTICS_LOADING
} from "./types";

export const getAntibiotics = () => dispatch => {
  dispatch(setAntibioticsLoading());
  axios
    .get("/api/antibiotics")
    .then(res =>
      dispatch({
        type: GET_ANTIBIOTICS,
        payload: res.data
      })
    )
    .catch(e => {
      // TODO: error processing
      console.error(e);
    });
};

export const deleteAntibiotic = id => dispatch => {
  axios
    .delete(`api/antibiotics/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_ANTIBIOTIC,
        payload: id
      });
    })
    .catch(e => {
      // TODO: error processing
      console.error(e);
    });
};

export const addAntibiotic = antibiotic => dispatch => {
  axios
    .post("/api/antibiotics", antibiotic)
    .then(res => {
      dispatch({
        type: ADD_ANTIBIOTIC,
        payload: res.data
      });
    })
    .catch(e => {
      // TODO: error processing
      console.error(e);
    });
};

export const setAntibioticsLoading = () => {
  return {
    type: ANTIBIOTICS_LOADING
  };
};
