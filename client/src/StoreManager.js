import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

const composeLeft = (...fns) => args => fns.reduce((d, fn) => fn(d), args);

class StoreManager {
  entities = {};

  addEntity({ name, reducer, actionTypes, actions }) {
    if (this.entities[name]) {
      console.error(`entity ${name} has aleady been added, ignoring...`);
      return;
    }
    this.store = null;

    this.entities[name] = { reducer, actions, actionTypes };
  }

  addModel({ modelName, fields, modelListComponent }) {
    if (this.entities[modelName]) {
      console.error(`entity ${modelName} has aleady been added, ignoring...`);
      return;
    }
    this.store = null;

    this.entities[modelName] = composeLeft(
      generateActionTypes,
      generateActions,
      generateReducer
    )({
      _isModel: true,
      name: modelName,
      fields,
      modelListComponent
    });
  }

  getStore() {
    if (this.store) {
      return this.store;
    }

    const middleware = [thunk];

    const reducers = Object.keys(this.entities).reduce((r, name) => {
      r[name] = this.entities[name].reducer;
      return r;
    }, {});

    this.store = createStore(
      combineReducers(reducers),
      {},
      applyMiddleware(...middleware)
    );

    Object.values(this.entities).forEach(entity => {
      if (entity.loadAction) {
        this.store.dispatch(entity.loadAction());
      }
    });

    return this.store;
  }

  getModels() {
    return Object.values(this.entities).filter(entity => entity._isModel);
  }
}

export default StoreManager;

const generateActionTypes = cfg => ({
  ...cfg,
  createActionType: `ADD_${cfg.name.toUpperCase()}`,
  deleteActionType: `DELETE_${cfg.name.toUpperCase()}`,
  updateActionType: `UPDATE_${cfg.name.toUpperCase()}`,
  loadActionType: `LOAD_${cfg.name.toUpperCase()}`,
  setLoadingActionType: `SET_${cfg.name.toUpperCase()}_LOADING`
});

const generateActions = cfg => {
  const createAction = model => dispatch => {
    axios
      .post(`/api/${cfg.name}s`, model)
      .then(res => {
        dispatch({
          type: cfg.createActionType,
          payload: res.data
        });
      })
      .catch(e => {
        console.error(`failed to create new ${cfg.name}`, e, model);
      });
  };

  const updateAction = model => dispatch => {
    axios
      .post(`/api/${cfg.name}s`, model)
      .then(res => {
        dispatch({
          type: cfg.updateActionType,
          payload: res.data
        });
      })
      .catch(e => {
        console.error(`failed to update ${cfg.name}`, e, model);
      });
  };

  const deleteAction = id => dispatch => {
    axios
      .delete(`/api/${cfg.name}s/${id}`)
      .then(res => {
        dispatch({
          type: cfg.deleteActionType,
          payload: id
        });
      })
      .catch(e => {
        console.error(`failed to delete ${cfg.name} by id ${id}`, e);
      });
  };

  const setLoadingAction = () => ({ type: cfg.setLoadingActionType });

  const loadAction = () => dispatch => {
    dispatch(setLoadingAction());
    axios
      .get(`/api/${cfg.name}s`)
      .then(res =>
        dispatch({
          type: cfg.loadActionType,
          payload: res.data
        })
      )
      .catch(e => {
        console.error(`failed to load ${cfg.name}s`, e);
      });
  };

  return {
    ...cfg,
    createAction,
    updateAction,
    deleteAction,
    loadAction,
    setLoadingAction
  };
};

const generateReducer = cfg => {
  const initialState = {
    items: [],
    loading: false
  };

  return {
    ...cfg,
    reducer: (state = initialState, action) => {
      switch (action.type) {
        case cfg.createActionType:
          return {
            ...state,
            items: [action.payload, ...state.items]
          };

        case cfg.updateActionType:
          return {
            ...state,
            items: state.items.map(m =>
              m._id === action.payload._id ? action.payload : m
            )
          };

        case cfg.deleteActionType:
          return {
            ...state,
            items: state.items.filter(m => m._id !== action.payload)
          };

        case cfg.loadActionType:
          return {
            ...state,
            loading: false,
            items: action.payload
          };

        case cfg.setLoadingActionType:
          return {
            ...state,
            loading: true
          };

        default:
          return state;
      }
    }
  };
};
