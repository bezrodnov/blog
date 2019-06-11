import { SWITCH_LOCALE } from "../actions/types";
import en_EN from "../i18n/en_EN";
import ru_RU from "../i18n/ru_RU";

const DEFAULT_LOCALE = "en_EN";
const LOCALES = { en_EN, ru_RU };

const compose = (...fns) => args => fns.reduce((d, fn) => fn(d), args);

const loadLocales = () => ({
  locales: Object.keys(LOCALES),
  locale:
    (window.localStorage && localStorage.getItem("adbMedic.locale")) ||
    DEFAULT_LOCALE
});

const setLabels = args => ({
  ...args,
  labels: LOCALES[args.locale] || DEFAULT_LOCALE
});

const setDocumentTitle = args => {
  document.title = args.labels["adb.title"];
  return args;
};

const loadInitialState = compose(
  loadLocales,
  setLabels,
  setDocumentTitle
);

const saveLocale = args => {
  if (window.localStorage) {
    window.localStorage.setItem("adbMedic.locale", args.locale);
  }
  return args;
};

export default (state = loadInitialState(), action) => {
  switch (action.type) {
    case SWITCH_LOCALE:
      return compose(
        saveLocale,
        setLabels,
        setDocumentTitle
      )({ ...state, locale: action.payload });
    default:
      return state;
  }
};
