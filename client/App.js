/**
 * Root Component
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import cookie from 'react-cookie';

// Import Routes
import routes from './routes';
import { loginUserSuccess } from './modules/App/AppActions';

// Base stylesheet
require('./main.css');

export default class App extends Component {

  componentWillMount() {
    const token = cookie.load('token');
    if (token) {
      this.props.store.dispatch(loginUserSuccess());
    }
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
      </Provider>
    );
  }
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
};
