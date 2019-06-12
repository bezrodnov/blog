import React from "react";

export default React.createContext({
  store: null,
  models: [],
  routes: [] // TODO: refactor, make model list component configurable
});
