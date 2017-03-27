import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

import { loginUser } from '../../AppActions';

import { validateLogin } from '../../../../util/validator';

class Login extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }


  onSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;
    const errors = validateLogin({ email, password });

    if (!isEmpty(errors)) {
      this.setState({ errors });
      return;
    }

    this.props.loginUser({ email, password });
  }

  onChange(event) {
    const input = event.target.name;
    const value = event.target.value;
    if (input === 'email') {
      this.setState({ email: value });
    } else {
      this.setState({ password: value });
    }

    const data = {};
    data[input] = value;
    const errors = validateLogin(data);
    if (!isEmpty(errors)) {
      this.setState({ errors });
    }
  }


  render() {
    const { errors } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="text" onChange={this.onChange} />
            {errors.email ? errors.email : null}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" onChange={this.onChange} />
            {errors.password ? errors.password : null}
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};


export default connect(null, { loginUser })(Login);
