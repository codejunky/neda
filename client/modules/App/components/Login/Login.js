import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { loginUser } from '../../AppActions';

// require('./Login.css');

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.loginUser(values);
  }

  render() {
    return (
      <div>
        <h1>Login Page.</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email" /><br />
          <label htmlFor="password">Password</label>
          <Field name="password" component="input" type="password" /><br />
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

const loginForm = reduxForm({
  form: 'login',
});


export default connect(null, { loginUser })(loginForm(Login));
