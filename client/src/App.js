import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "bootstrap/dist/css/bootstrap.min.css";

import { loadUser } from "./actions/authActions";

import ModelUIContext from "./ModelUIContext";
import ModelUIContextProvider from "./ModelUIContextProvider";

import AppNavBar from "./components/AppNavBar";
import LoadingMask from "./components/LoadingMask";

export default class App extends Component {
  render() {
    return (
      <ModelUIContextProvider modelSchemaURL="/api/model/schema">
        <div className="adb-app">
          <div id="bg-img" />
          <Router>
            <ModelUIContext.Consumer>
              {({ store, routes, models }) => {
                store && store.dispatch(loadUser());
                return (
                  <TransitionGroup component={null}>
                    {this.renderLoadingMask(store, models)}
                    {this.renderContent(store, routes)}
                  </TransitionGroup>
                );
              }}
            </ModelUIContext.Consumer>
          </Router>
        </div>
      </ModelUIContextProvider>
    );
  }

  renderLoadingMask(store, models = []) {
    if (store) {
      return (
        <Provider store={store} key="connected-loading-mask">
          <Route
            children={({ location }) => {
              const mapStateToProps = state => ({
                show: models.some(({ name }) => state[name].loading === true && `/${name}s` === location.pathname)
              });
              const ConnectedMask = connect(mapStateToProps)(LoadingMask);
              return <ConnectedMask />;
            }}
          />
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
        <Route
          children={({ location }) => [
            <AppNavBar key="navbar" path={location.pathname} />,
            <TransitionGroup key="pages" className="pages">
              <CSSTransition key={location.pathname} classNames="fade" timeout={500}>
                <Switch location={location}>
                  {routes.map(({ path, component }) => (
                    <Route key={path} exact path={path} component={component} />
                  ))}
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          ]}
        />
      </Provider>
    );
  }
}
