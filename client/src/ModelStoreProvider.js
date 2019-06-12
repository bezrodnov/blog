import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import ModelStoreContext from "./ModelStoreContext";
import StoreManager from "./StoreManager";
import settingsReducer from "./reducers/settingsReducer";

export default class ModelStoreProvider extends Component {
  constructor() {
    super(...arguments);

    this.state = {};
    axios.get(this.props.modelSchemaURL).then(res => {
      const storeManager = new StoreManager();
      storeManager.addEntity({ name: "settings", reducer: settingsReducer });

      const models = res.data;
      models.forEach(({ modelName: name, fields }) => {
        storeManager.addModel({ name, fields });
      });

      this.setState({
        models,
        store: storeManager.getStore(),
        routes: storeManager.getRoutes()
      });
    });
  }

  render() {
    return (
      <ModelStoreContext.Provider value={this.state}>
        {this.props.children}
      </ModelStoreContext.Provider>
    );
  }
}

ModelStoreProvider.propTypes = {
  modelSchemaURL: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
};
