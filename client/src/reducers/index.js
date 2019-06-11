import { combineReducers } from "redux";

import antibioticReducer from "./antibioticReducer";
import antibioticTypeReducer from "./antibioticTypeReducer";
import departmentReducer from "./departmentReducer";
import settingsReducer from "./settingsReducer";

export default combineReducers({
  antibiotic: antibioticReducer,
  antibioticType: antibioticTypeReducer,
  department: departmentReducer,
  settings: settingsReducer
});
