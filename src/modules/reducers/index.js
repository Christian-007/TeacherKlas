import { combineReducers } from 'redux';
import authReducer from './authReducer';
import completeProfileReducer from './completeProfileReducer';

const appReducer = combineReducers({
  /* your app’s top-level reducers */
  authReducer,
  completeProfileReducer
})

export const rootReducer = (state, action) => {
  if (action.type === 'COMPLETE_PROFILE') {
    state = undefined
  }

  return appReducer(state, action)
}