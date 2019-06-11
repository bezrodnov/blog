import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "bootstrap/dist/css/bootstrap.min.css";

import AppNavBar from "./components/AppNavBar";
import StoreManager from "./ADBStoreManager";
const store = StoreManager.getStore(true);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div id="bg-img" className="adb-app">
            <AppNavBar />
            <Route
              render={({ location }) => (
                <TransitionGroup className="pages">
                  <CSSTransition
                    key={location.key}
                    classNames="fade"
                    timeout={500}
                  >
                    <Switch location={location}>
                      {StoreManager.getRoutes().map(({ path, component }) => (
                        <Route
                          key={path}
                          exact
                          path={path}
                          component={component}
                        />
                      ))}
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              )}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}
