/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './modules/App/App';
import Home from './components/Home';
import Login from './modules/App/components/Login/Login';
import Register from './modules/App/components/Register/Register';
import RequireGuest from './util/components/RequireGuest';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="login" component={RequireGuest(Login)} />
    <Route path="register" component={RequireGuest(Register)} />
  </Route>
);
