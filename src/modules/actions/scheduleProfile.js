import * as t from './types';
import * as api from '../../utils/api';
import { auth, database } from "../../utils/firebase";
import { AsyncStorage } from 'react-native';

export function createSchedule(data) {
  console.log('hey create')
  return (dispatch) => {
    dispatch(addSchedule(data));
  };
}

export function adjustSchedule(schedule) {
  return (dispatch) => {
    dispatch(updateSchedule(schedule));
  };
}

export function removeSchedule(scheduleId) {
  return (dispatch) => {
    dispatch(deleteSchedule(scheduleId));
  };
}

export function submitProfile(data) {
  return (dispatch) => Promise.all([
    promiseProfile(data.workExperience, 'teacherExperience'),
    promiseProfile(data.schedules, 'teacherSchedules'),
    promiseProfile(data.education, 'teacherEducations'),
    promiseProfile(data.subjects, 'teacherSubjects'),
  ]).then((responses) => {
    console.log('responses: ', responses);
  });
}

const promiseProfile = (dataRef, dbChildRef) => {
  return new Promise((resolve, reject) => {
    dataRef.map(datum => {
      database.ref().child(dbChildRef).push(datum, function(error) {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    })
  });
};

let nextSchedule = 0;
const addSchedule = (schedule) => {
  console.log('hey add');
  return {
    type: t.ADD_SCHEDULE,
    id: nextSchedule++,
    data: schedule
  }
}

const updateSchedule = (schedule) => {
  return {
    type: t.UPDATE_SCHEDULE,
    data: schedule
  }
}

const deleteSchedule= (scheduleId) => {
  return {
    type: t.DELETE_SCHEDULE,
    id: scheduleId
  }
}