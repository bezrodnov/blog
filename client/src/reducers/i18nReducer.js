import { SWITCH_LOCALE } from "../actions/types";
import en_EN from "../i18n/en_EN";
import ru_RU from "../i18n/ru_RU";

const initialState = {
  labels: en_EN
  // labels: ru_RU
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_LOCALE:
      return {
        ...state,
        labels: getLabels(action.payload)
      };
    default:
      return state;
  }
};

const getLabels = locale => {
  switch (locale) {
    case "en_EN":
      return en_EN;
    case "ru_RU":
      return ru_RU;
    default:
      return en_EN;
  }
};