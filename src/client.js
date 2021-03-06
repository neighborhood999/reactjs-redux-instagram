/* eslint global-require: 0, no-underscore-dangle: 0 */
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.min.css';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import './stylesheets/css/style.css';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

if (process.env.NODE_ENV === 'development') {
  const createDevToolsWindow = require('./utils/createDevToolsWindow').default;
  createDevToolsWindow(store);
}

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
