import { SWITCH_LOCALE } from "./types";

export const switchLocale = locale => ({
  type: SWITCH_LOCALE,
  payload: locale
});
