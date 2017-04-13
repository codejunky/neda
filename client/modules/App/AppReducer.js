// Import Actions
import { LOGIN_USER_SUCCESS } from './AppActions';

// Initial State
const initialState = {
  authenticated: false,
  user: { },
};


const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        authenticated: true,
        user: action.user,
      };
    default:
      return state;
  }
};

// Export Reducer
export default AppReducer;
