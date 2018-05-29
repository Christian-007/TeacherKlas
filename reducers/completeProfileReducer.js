import { AsyncStorage } from 'react-native';
import * as t from '../actions/types';

const initialState = {
  subjects: [],
  workExperience: [],
  education: [],
};

const completeProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.ADD_SUBJECT:
      return {
        ...state,
        subjects: [
          ...state.subjects,
          {
            id: action.id,
            title: action.data
          }
        ]
      };

    case t.ADD_WORK:
      return {
        ...state,
        workExperience: [
          ...state.workExperience,
          {
            id: action.id,
            company: action.data.company,
            industry: action.data.industry,
            role: action.data.role,
            startmonth: action.data.startmonth,
            startyear: action.data.startyear,
            endmonth: action.data.endmonth,
            endyear: action.data.endyear,
          }
        ]
      };
    
    case t.ADD_EDUCATION:
      return {
        ...state,
        education: [
          ...state.education,
          {
            id: action.id,
            university: action.data.university,
            degree: action.data.degree,
            major: action.data.major,
            startmonth: action.data.startmonth,
            startyear: action.data.startyear,
            endmonth: action.data.endmonth,
            endyear: action.data.endyear,
          }
        ]
      };
    
    case t.DELETE_SUBJECT:
      const subjectId = action.id;
      return {
        ...state,
        subjects: state.subjects.filter(subject => subject.id !== subjectId)
      };
      
    default:
      return state;
  }
};

export default completeProfileReducer;