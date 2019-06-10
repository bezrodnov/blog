import { combineReducers } from "redux";
import antibioticReducer from "./antibioticReducer";

export default combineReducers({
  antibiotic: antibioticReducer
});
