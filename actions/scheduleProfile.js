import * as t from './types';
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