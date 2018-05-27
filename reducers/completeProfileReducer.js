import { AsyncStorage } from 'react-native';
import * as t from '../actions/types';

const completeProfileReducer = (state = [], action) => {
  switch (action.type) {
    case t.ADD_SUBJECT:
      return [
        ...state,
        {
          id: action.id,
          title: action.data
        }
      ];
    
    case t.DELETE_SUBJECT:
      const subjectId = action.id;
      return state.filter(subject => subject.id !== subjectId);
      
    default:
      return state;
  }
};

export default completeProfileReducer;