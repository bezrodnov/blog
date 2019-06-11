import { combineReducers } from "redux";
import antibioticReducer from "./antibioticReducer";
import antibioticTypeReducer from "./antibioticTypeReducer";
import departmentReducer from "./departmentReducer";
import i18nReducer from "./i18nReducer";

export default combineReducers({
  antibiotic: antibioticReducer,
  antibioticType: antibioticTypeReducer,
  department: departmentReducer,
  i18n: i18nReducer
});
