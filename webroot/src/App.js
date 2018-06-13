import React, {Component} from "react";
import AppContainer from "./containers/App";
import thunkMiddleware from "redux-thunk";
import reducers from "./actions/reducers";
import storage from "redux-persist/es/storage";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import {apiMiddleware} from "redux-api-middleware";
import {persistCombineReducers, persistStore} from "redux-persist";
import {PersistGate} from 'redux-persist/es/integration/react';
import "./App.css"

const middleware = [thunkMiddleware, apiMiddleware];
const persistConfig = {
  storage,
  key: "root",
};

const reducer = persistCombineReducers(persistConfig, reducers);
const store = createStore(
  reducer,
  compose(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer/>
        </PersistGate>
      </Provider>
    )
  }
}