import { AsyncStorage } from 'react-native';
import * as t from '../actions/types';

const initialState = {
  subjects: [],
  workExperience: [],
  education: [],
  schedules: [],
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
    
    case t.ADD_SCHEDULE:
      return {
        ...state,
        schedules: [
          ...state.schedules,
          {
            id: action.id,
            starttime: action.data.starttime,
            endtime: action.data.endtime,
            day: action.data.day,
          }
        ]
      };
    
    case t.UPDATE_SCHEDULE:
      return {
        ...state,
        schedules: state.schedules.map(schedule => {
          if(schedule.id !== action.data.id) {
            // This isn't the item we care about - keep it as-is
            console.log('not the object:', schedule);
            return schedule;
          }
          // Otherwise, this is the one we want - return an updated value
          console.log('update object:', schedule);
          return {
            ...schedule,
            ...action.data
          };   
        })
      };
    
    case t.DELETE_SUBJECT:
      const subjectId = action.id;
      return {
        ...state,
        subjects: state.subjects.filter(subject => subject.id !== subjectId)
      };
    
    case t.DELETE_SCHEDULE:
      const scheduleId = action.id;
      return {
        ...state,
        schedules: state.schedules.filter(schedule => schedule.id !== scheduleId)
      };
      
    default:
      return state;
  }
};

export default completeProfileReducer;