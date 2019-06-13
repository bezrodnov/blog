import React, { Component } from "react";
import { Provider, connect } from "react-redux";
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
            {({ store, routes, models }) => (
              <TransitionGroup component={null}>
                {this.renderLoadingMask(store, models)}
                {this.renderContent(store, routes)}
              </TransitionGroup>
            )}
          </ModelStoreContext.Consumer>
        </div>
      </ModelStoreProvider>
    );
  }

  renderLoadingMask(store, models = []) {
    if (store) {
      const mapStateToProps = state => ({
        show: models.some(({ modelName }) => state[modelName].loading === true)
      });
      const ConnectedMask = connect(mapStateToProps)(LoadingMask);
      return (
        <Provider store={store} key="connected-loading-mask">
          <ConnectedMask />
        </Provider>
      );
    }
    return <LoadingMask key="loading-mask" show={!!store} />;
  }

  renderContent(store, routes) {
    if (!store) {
      return null;
    }
    return (
      <Provider store={store}>
        <Router>
          <Route
            children={({ location }) => [
              <AppNavBar key="navbar" path={location.pathname} />,
              <TransitionGroup key="pages" className="pages">
                <CSSTransition
                  key={location.pathname}
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
            ]}
          />
        </Router>
      </Provider>
    );
  }
}
