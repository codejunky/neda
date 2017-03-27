import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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
    };
  }


  onSubmit(event) {
    event.preventDefault();
    const { username, email, password, password_confirmation } = this.state;
    this.props.registerUser({ username, email, password, password_confirmation });
  }

  onChange(event) {
    const input = event.target.name;
    const value = event.target.value;
    switch (input) {
      case 'email':
        this.setState({ email: value });
        break;
      case 'username':
        this.setState({ username: value });
        break;
      case 'password':
        this.setState({ password: value });
        break;
      case 'password_confirmation':
        this.setState({ password_confirmation: value });
        break;
      default:
        break;
    }
  }


  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="Email">Email</label>
            <input type="email" id="email" name="email" onChange={this.onChange} />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" onChange={this.onChange} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" onChange={this.onChange} />
          </div>
          <div>
            <label htmlFor="password_confirmation">Password</label>
            <input id="password_confirmation" name="password_confirmation" type="password" onChange={this.onChange} />
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
