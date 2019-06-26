import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";

import ModelUIContext from "./ModelUIContext";
import ModelList from "./components/ModelList";
import StoreManager from "./StoreManager";

import settingsReducer from "./reducers/settingsReducer";
import authReducer from "./reducers/authReducer";
import errorReducer from "./reducers/errorReducer";

export default class ModelUIContextProvider extends Component {
  constructor() {
    super(...arguments);

    this.state = {};
    axios.get(this.props.modelSchemaURL).then(res => {
      const storeManager = new StoreManager();
      // add custom store entities
      storeManager.addEntity({ name: "settings", reducer: settingsReducer });
      storeManager.addEntity({ name: "auth", reducer: authReducer });
      storeManager.addEntity({ name: "error", reducer: errorReducer });
      // add models from the server response
      res.data.forEach(storeManager.addModel.bind(storeManager));

      const models = storeManager.getModels();
      this.setState({
        models,
        store: storeManager.getStore(),
        routes: getRoutes(models)
      });
    });
  }

  render() {
    return <ModelUIContext.Provider value={this.state}>{this.props.children}</ModelUIContext.Provider>;
  }
}

ModelUIContextProvider.propTypes = {
  modelSchemaURL: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
};

const getRoutes = models =>
  models.map(model => ({
    path: `/${model.name}s`,
    component: generateModelListComponent(model, models)
  }));

const generateModelListComponent = (model, models) => {
  const { name, createAction, updateAction, deleteAction, fields } = model;

  const getChildModels = state =>
    fields
      .filter(field => field.type === "Embedded")
      .reduce((childModels, field) => {
        const childModel = models.find(model => model.name === field.ref);
        if (childModel) {
          childModels[childModel.name] = state[childModel.name];
        }
        return childModels;
      }, {});

  const mapStateToProps = state => ({
    modelName: name,
    settings: state["settings"],
    model: state[name],
    childModels: getChildModels(state),
    fields
  });
  const mapDispatchToProps = { createAction, updateAction, deleteAction };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(model.modelListComponent || ModelList);
};
