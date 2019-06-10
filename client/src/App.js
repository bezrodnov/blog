import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import store from "./store";

import AppNavBar from "./components/AppNavBar";
import AntibioticList from "./routes/antibiotics/AntibioticList";
import AntibioticTypeList from "./routes/antibioticTypes/AntibioticTypeList";

import "bootstrap/dist/css/bootstrap.min.css";

const paths = [
  { path: "/antibiotics", component: AntibioticList },
  { path: "/antibioticTypes", component: AntibioticTypeList }
];

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
                      {paths.map(({ path, component }) => (
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
