/**
 * Root Reducer
 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Import Reducers
import app from './modules/App/AppReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  formReducer,
});
