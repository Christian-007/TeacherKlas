import { combineReducers } from 'redux';
import authReducer from './authReducer';
import completeProfileReducer from './completeProfileReducer';

export default combineReducers({
  authReducer,
  completeProfileReducer
});