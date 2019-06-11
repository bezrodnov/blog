import { SWITCH_LOCALE } from "../actions/types";
import en_EN from "../i18n/en_EN";
import ru_RU from "../i18n/ru_RU";

const DEFAULT_LOCALE = "en_EN";
const LOCALES = { en_EN, ru_RU };

const initialLocale = loadLocale();
const initialState = {
  locale: initialLocale,
  labels: getLabels(initialLocale),
  locales: ["en_EN", "ru_RU"]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_LOCALE:
      saveLocale(action.payload);
      return {
        ...state,
        locale: action.payload,
        labels: getLabels(action.payload)
      };
    default:
      return state;
  }
};

function getLabels(locale) {
  return LOCALES[locale] || DEFAULT_LOCALE;
}

function loadLocale() {
  if (window.localStorage) {
    return localStorage.getItem("adbMedic.locale") || DEFAULT_LOCALE;
  }
  return DEFAULT_LOCALE;
}

function saveLocale(locale) {
  if (window.localStorage) {
    window.localStorage.setItem("adbMedic.locale", locale);
  }
}
