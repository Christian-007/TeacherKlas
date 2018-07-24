import * as t from './types';
import firebase from 'react-native-firebase';
import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';

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

export function addSchedule(dayName, schedule) {
  return (dispatch) => {
    dispatch(addSlot(dayName, schedule));
  };
}

export function adjustDayStatus(dayName, value) {
  return (dispatch) => {
    dispatch(changeDayStatus(dayName, value));
  };
}

const uploadImage = (uri, name,  mime = 'image/jpeg') => {
  const storageRef = firebase.storage().ref('users'); // change this to be user ID
  const userFolder = storageRef.child(name);
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;
  
  return new Promise((resolve, reject) => {
    let imgUri = uri; let uploadBlob = null;
    const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;

    fs.readFile(uploadUri, 'base64')
      .then(data => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then(blob => {
        uploadBlob = blob;
        return userFolder.put(uploadUri, { contentType: mime, name: name }); // use URI instead of blob
        // might not ned RNFetchBlob anymore
      })
      .then(() => {
        uploadBlob.close()
        return userFolder.getDownloadURL();
      })
      .then(url => {
        resolve(url);
      })
      .catch(error => {
        reject(error)
    })
  })
}

export function submitProfile(data) {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(uploadData());
    Promise.all([
      uploadImage(data.imgData.uri, data.imgData.fileName)
      .then(imgUrl => {
        console.log('URL', imgUrl);
        updateProfile(
          {
            ...data.personalData,
            profileURL: imgUrl
          },
          'teachers/userId23456' // Use correct TeacherID
        );
      }),
      promiseProfile(data.workExperience, 'teacherExperience/userId23456'),
      promiseProfile(data.schedules, 'teacherSchedules/userId23456'),
      promiseProfile(data.education, 'teacherEducations/userId23456'),
      promiseProfile(data.subjects, 'teacherSubjects/userId23456'),
    ])
    .then(responses => {
      console.log('responses: ', responses);
      dispatch(completeSubmission());
      resolve(true);
    })
    .catch(error => {
      reject(error);
    });
  });
}

const updateProfile = (dataContent, dbChildRef) => {
  return new Promise((resolve, reject) => {
    firebase.database().ref(dbChildRef).set(dataContent, function(error) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};

const promiseProfile = (dataRef, dbChildRef) => {
  return new Promise((resolve, reject) => {
    dataRef.map(datum => {
      firebase.database().ref().child(dbChildRef).push(datum, function(error) {
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

const addSlot = (dayName, schedule) => {
  return {
    type: t.ADD_SCHEDULE,
    day: dayName,
    data: schedule
  }
}

const changeDayStatus = (dayName, value) => {
  return {
    type: t.CHANGE_DAY_STATUS,
    day: dayName,
    data: value
  }
}

const completeSubmission = () => {
  return {
    type: t.COMPLETE_PROFILE,
  }
}

const updateSchedule = (schedule) => {
  return {
    type: t.UPDATE_SCHEDULE,
    data: schedule
  }
}

const deleteSchedule = (scheduleId) => {
  return {
    type: t.DELETE_SCHEDULE,
    id: scheduleId
  }
}

const uploadData = () => {
  return {
    type: t.IS_LOADING,
  }
}