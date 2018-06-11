import * as t from './types';
import { storage } from "../../utils/firebase";

export function uploadImage(imgData) {
  const storageRef = storage.ref('users');
  // const imgName = imgData.file;
  // const userFolder = storageRef.child(imgName);
  const img = imgData.data;
  
  return (dispatch) => {
    dispatch(addImage(imgData));
    /*userFolder.putString(img, 'base64').then(snapshot => {
      console.log('Upload img successfully!');
      dispatch(addImage(imgData));
    }, error => {
      console.log("Error upload: ", error);
    });*/
  };
};

const addImage = (imgData) => {
  return {
    type: t.UPLOAD_IMAGE,
    data: imgData
  }
}