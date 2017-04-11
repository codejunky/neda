import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

// Export Constants
export const LOGIN_USER_SUCCESS = 'login_user_success';
export const LOGOUT_USER_SUCCESS = 'logout_user_succes';

export function loginUserSuccess() {
  return {
    type: LOGIN_USER_SUCCESS,
  };
}

function setUserAndRedirect(dispatch, token, user) {
  cookie.save('token', token, { path: '/', maxAge: Date.now() + (7 * 24 * 60 * 60) });
  cookie.save('user', user, { path: '/', maxAge: Date.now() + (7 * 24 * 60 * 60) });
  browserHistory.push('/');
  dispatch(loginUserSuccess());
}

// Export Actions
export function loginUser({ email, password }) {
  return dispatch => {
    axios.post('/login', { email, password })
      .then((res) => {
        setUserAndRedirect(dispatch, res.data.token, res.data.user);
      });
  };
}

export function registerUser({ username, email, password, password_confirmation }, errorCallback) {
  return dispatch => {
    axios.post('/register', { username, email, password, password_confirmation })
      .then((res) => {
        if (res.data.errors) {
          errorCallback(res.data.errors);
        } else {
          setUserAndRedirect(dispatch, res.data.token, res.data.user);
        }
      });
  };
}

export function logout() {
  const token = cookie.load('token');
  if (token) {
    return dispach => {
      axios.delete('/logout')
        .then(() => {
          cookie.remove('token');
          cookie.remove('user');
          dispach({
            type: LOGOUT_USER_SUCCESS,
          });
        });
    };
  }

  return browserHistory.push('/login');
}
