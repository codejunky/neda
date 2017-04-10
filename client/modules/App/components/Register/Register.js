import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

import { validateRegister } from '../../../../util/validator';

import { registerUser } from '../../AppActions';

class Register extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      email: '',
      username: '',
      password: '',
      password_confirmation: '',
      errors: {},
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const { username, email, password, password_confirmation } = this.state;

    const errors = this.validate({ username, email, password, password_confirmation });

    if (!isEmpty(errors)) {
      return;
    }

    this.props.registerUser({ username, email, password, password_confirmation }, (registerErrors) => {
      this.state = { ...this.state, errors: registerErrors };
      this.forceUpdate();
    });
  }

  onChange(event) {
    const input = event.target.name;
    const value = event.target.value;
    switch (input) {
      case 'email':
        this.state = { ...this.state, email: value };
        break;
      case 'username':
        this.state = { ...this.state, username: value };
        break;
      case 'password':
        this.state = { ...this.state, password: value };
        break;
      case 'password_confirmation':
        this.state = { ...this.state, password_confirmation: value };
        break;
      default:
        break;
    }
    const { username, email, password, password_confirmation } = this.state;
    this.validate({ username, email, password, password_confirmation });
  }

  validate({ username, email, password, password_confirmation }) {
    const errors = validateRegister({ username, email, password, password_confirmation });

    this.state = { ...this.state, errors };
    this.forceUpdate();
    return errors;
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="Email">Email</label>
            <input type="email" id="email" name="email" onChange={this.onChange} />
             {errors.email ? errors.email : null}
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" onChange={this.onChange} />
            {errors.username ? errors.username : null}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" onChange={this.onChange} />
            {errors.password ? errors.password : null}
          </div>
          <div>
            <label htmlFor="password_confirmation">Password</label>
            <input id="password_confirmation" name="password_confirmation" type="password" onChange={this.onChange} />
            {errors.password_confirmation ? errors.password_confirmation : null}
          </div>
          <div>
            <button type="submit">Create account</button>
          </div>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

export default connect(null, { registerUser })(Register);
