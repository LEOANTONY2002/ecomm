import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { applyMiddleware, compose, createStore } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const store = createStore(allReducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
