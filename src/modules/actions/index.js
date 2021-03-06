import * as t from './types';
import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';

export function registerUser(data) {
  return (dispatch) => new Promise(async (resolve, reject) => {

    // update store with loading status
    dispatch(checkingStatus());
    try {
      const registerApi = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
      dispatch(registerSuccess(registerApi));
      await firebase.auth().onAuthStateChanged(async (user) => {
        if(user) {
          try {
            // const sendEmail = await user.sendEmailVerification();
            await firebase.database().ref('teachers/' + user.uid).set({
              email: data.email,
              completeProfile: false,
            }, function(error) {
              if (error) {
                reject(error);
              } else {
                // Data saved successfully!
                resolve(registerApi);
              }
            });
          } catch (error) {
            reject(error);
          }
        } else {
          reject(user);
        }
      });
      
    } catch (error) {
      dispatch(authError(error));
      reject(error);
    }

  });
}

export function loginUser(data) {
  return (dispatch) => new Promise(async (resolve,reject) => {
    dispatch(checkingStatus());

    try {
      const loginApi = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
      await firebase.auth().onAuthStateChanged(async (user) => {
        if(user) {
          try {
            // const sendEmail = await user.sendEmailVerification();
            await firebase.database().ref('/teachers/' + user.uid).once('value')
              .then(function(snapshot) {
                console.log('snapshot' + JSON.stringify(snapshot.val()));
                const completeProfile = snapshot.val().completeProfile;
                console.log('completeProfile: ' + completeProfile);
        
                // FOR DEVELOPMENT
                dispatch(loginSuccess(loginApi, {isCompleteProfile: completeProfile}));
                resolve(completeProfile);
              })
              .catch((error) => {
                console.log('error: ' + error);
                reject(error);
              });
          } catch (error) {
            reject(error);
          }
        } else {
          reject(user);
        }
      });

      /* FOR PRODUCTION */
      /*const isVerified = loginApi.emailVerified;
      const notVerified = {
        err: 'email is not verified'
      };
      if(isVerified) {
        dispatch(loginSuccess(loginApi));
        resolve(loginApi);
      } else {
        reject(notVerified);
      }*/
    } catch (error) {
      dispatch(authError(error));
      reject(error);
    }
  });
}

export function logoutUser() {
  return (dispatch) => new Promise(async (resolve, reject) => {
    try {
      const logoutApi = await firebase.auth().signOut();
      dispatch(loggedOut());
      resolve(logoutApi);
    } catch (error) {
      dispatch(authError(error));
      reject(error);
    }
  });
}

export function chooseSubject(title) {
  return (dispatch) => new Promise( async resolve => {
    await dispatch(addSubject(title));
    resolve(true);
  });
}

export function deleteSubject(subjectId) {
  return (dispatch) => new Promise( async resolve => {
    await dispatch(deleteSubject(subjectId));
    resolve(true);
  });
}

export function addWorkExperience(data) {
  return (dispatch) => {
    dispatch(addWork(data));
  };
}

export function addEducationExperience(data) {
  return (dispatch) => {
    dispatch(addEducation(data));
  };
}

export function removeExperience(expType, expId) {
  return (dispatch) => {
    dispatch(deleteExperience(expType, expId));
  };
}

// Actions Creators
const checkingStatus = () => {
  return {
    type: t.IS_LOADING,
  }
}

let nextSubject = 0;
const addSubject = (subject) => {
  return {
    type: t.ADD_SUBJECT,
    id: nextSubject++,
    data: subject
  }
}

const deleteSubject = (subjectId) => {
  return {
    type: t.DELETE_SUBJECT,
    id: subjectId
  }
}

let nextWork = 0;
const addWork = (data) => {
  return {
    type: t.ADD_WORK,
    id: nextWork++,
    data
  }
}

let nextEducation = 0;
const addEducation = (data) => {
  return {
    type: t.ADD_EDUCATION,
    id: nextEducation++,
    data
  }
}

const deleteExperience= (expType, expId) => {
  return {
    type: t.DELETE_EXPERIENCE,
    id: expId,
    expType,
  }
}

const registerSuccess = (userData) => {
  return {
    type: t.REGISTER_SUCCESS,
    data: userData
  }
}

const authError = (error) => {
  return {
    type: t.AUTH_ERROR,
    response: error
  }
}

const loginSuccess = (userData, isCompleteProfile) => {
  return {
    type: t.LOGIN_SUCCESS,
    data: userData,
    isCompleteProfile
  }
}

const loggedOut = () => {
  return {
    type: t.LOGGED_OUT,
  }
}