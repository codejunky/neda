// Import Actions
import { LOGIN_USER_SUCCESS } from './AppActions';

// Initial State
const initialState = {
  authenticated: false,
};


const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, { authenticated: true });
    default:
      return state;
  }
};

// Export Reducer
export default AppReducer;
