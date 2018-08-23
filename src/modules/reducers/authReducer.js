import { AsyncStorage } from 'react-native';

import * as t from '../actions/types';

const initialState = { 
  isLoggedIn: false, 
  user: null,
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.REGISTER_SUCCESS:
      return Object.assign({}, state, { 
        isLoading: false, 
      });
    
    case t.IS_LOADING:
      return Object.assign({}, state, {
        isLoading: true
      });
    
    case t.AUTH_ERROR:
      const err = action.response;
      return Object.assign({}, state, {
        error: err,
        isLoading: false,
      });

    case t.LOGIN_SUCCESS:
      const user = action.data;
      const completeProfile = action.isCompleteProfile;

      // Save token and data to Asyncstorage
      AsyncStorage.multiSet([
        ['user', JSON.stringify(user)],
        ['isCompleteProfile', JSON.stringify(completeProfile)]
      ]);

      return Object.assign({}, state, { 
        isLoggedIn: true,
        user: user,
        isLoading: false, 
      });
    
    case t.LOGGED_OUT:
      return Object.assign({}, state, {
        isLoggedIn: false, 
        user: null,
        isLoading: false,
      });
      
    default:
      return state;
  }
};

export default authReducer;