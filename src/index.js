import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import appReducers from "./redux/reducers/Index";
import thunk from "redux-thunk";
// import "./generator"

const store = createStore(appReducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store = { store }>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
