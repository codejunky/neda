import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IndexLink, Link } from 'react-router';

class Nav extends Component {
  generateNavLinks() {
    const { isAuthenticated, user, logout } = this.props;
    const links = [
      <IndexLink to="/">Home</IndexLink>,
    ];

    if (!isAuthenticated) {
      links.push(<Link to="/login">Login</Link>);
      links.push(<Link to="/register">Register</Link>);
    } else {
      const welcomeString = `Welcome ${user.username} `;
      links.push(<div>{welcomeString}<a onClick={logout} href="">Logout</a></div>);
    }

    return links.map((link, index) => <li key={index}>{link}</li>);
  }
  render() {
    return (
      <div>
        <ul>
          {this.generateNavLinks()}
        </ul>
      </div>
    );
  }
}

Nav.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

export default Nav;
