import * as t from './types';

export function uploadImage(imgData) {
  return (dispatch) => {
    dispatch(addImage(imgData));
  };
}

export function onAddPersonal(data) {
  return (dispatch) => {
    dispatch(addPersonal(data));
  };
}

const addImage = (imgData) => {
  return {
    type: t.ADD_IMAGE,
    data: imgData
  }
}

const addPersonal = (data) => {
  return {
    type: t.ADD_PERSONAL,
    data,
  }
}