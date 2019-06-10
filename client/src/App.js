import React, { Component } from "react";
import { Provider } from "react-redux";

import store from "./store";

import AppNavBar from "./components/AppNavBar";
import AntibioticList from "./components/AntibioticList";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavBar />
          <AntibioticList />
        </div>
      </Provider>
    );
  }
}

export default App;
