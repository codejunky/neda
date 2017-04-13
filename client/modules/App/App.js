import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

// Import Style
import styles from './App.css';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';

import Nav from '../../components/Nav';
import { logout } from './AppActions';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
    };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  render() {
    const { authenticated, logout } = this.props;
    const user = cookie.load('user');
    
    // TODO: Think of a way to only pass down data to children that need the data
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       isAuthenticated: authenticated,
       user,
     })
    );

    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="Home - NEDA App"
            titleTemplate="%s - NEDA App"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Nav isAuthenticated={authenticated} user={user} logout={logout} />
          <div className={styles.container}>
            {childrenWithProps}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    authenticated: state.app.authenticated,
  };
}

export default connect(mapStateToProps, { logout })(App);
