import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default (ComposedComponent) => {
  class RequireGuest extends Component {
    componentWillMount() {
      if (this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.authenticated) {
        this.context.router.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.app.authenticated };
  }

  RequireGuest.contextTypes = {
    router: PropTypes.object,
  };

  RequireGuest.propTypes = {
    authenticated: PropTypes.bool.isRequired,
  };

  return connect(mapStateToProps)(RequireGuest);
};
