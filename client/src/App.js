import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "bootstrap/dist/css/bootstrap.min.css";

import ModelStoreContext from "./ModelStoreContext";
import ModelStoreProvider from "./ModelStoreProvider";

import AppNavBar from "./components/AppNavBar";
import LoadingMask from "./components/LoadingMask";

export default class App extends Component {
  render() {
    return (
      <ModelStoreProvider modelSchemaURL="/api/model/schema">
        <div id="bg-img" className="adb-app">
          <ModelStoreContext.Consumer>
            {({ store, routes }) => {
              if (!store) {
                return <LoadingMask />;
              }
              return (
                <Provider store={store}>
                  <Router>
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
                              {routes.map(({ path, component }) => (
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
                  </Router>
                </Provider>
              );
            }}
          </ModelStoreContext.Consumer>
        </div>
      </ModelStoreProvider>
    );
  }

  renderLoadingMask() {
    return <div className="loading-mask" />;
  }
}
