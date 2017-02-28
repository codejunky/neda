import 'isomorphic-fetch';

// Export Constants
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

// Export Actions
export function loginUser({ email, password }) {
  return dispatch => {
    fetch('/login', { email, password })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: LOGIN_USER_SUCCESS
          });
        }
      });
  };
}
