import axios from "axios";
import {
  GET_DEPARTMENTS,
  ADD_DEPARTMENT,
  DELETE_DEPARTMENT,
  DEPARTMENTS_LOADING
} from "./types";

export const getDepartments = () => dispatch => {
  dispatch(setDepartmentsLoading());
  axios
    .get("/api/departments")
    .then(res =>
      dispatch({
        type: GET_DEPARTMENTS,
        payload: res.data
      })
    )
    .catch(e => {
      // TODO: error processing
      console.error(e);
    });
};

export const deleteDepartment = id => dispatch => {
  axios
    .delete(`api/departments/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_DEPARTMENT,
        payload: id
      });
    })
    .catch(e => {
      // TODO: error processing
      console.error(e);
    });
};

export const addDepartment = department => dispatch => {
  axios
    .post("/api/departments", department)
    .then(res => {
      dispatch({
        type: ADD_DEPARTMENT,
        payload: res.data
      });
    })
    .catch(e => {
      // TODO: error processing
      console.error(e);
    });
};

export const setDepartmentsLoading = () => {
  return {
    type: DEPARTMENTS_LOADING
  };
};
