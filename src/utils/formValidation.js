import validator from 'validator';

export const validateForm = (data) => {
  const { email, password, confirmPass } = data;
  let errors = {}; let isValid = false;

  if(!validator.isEmail(email)) {
    errors.email = 'invalid email address';
  }

  if(validator.isEmpty(email)) {
    errors.email = 'this field is required';
  }

  if(validator.isEmpty(password)) {
    errors.password = 'this field is required';
  }  

  if(validator.isEmpty(confirmPass)) {
    errors.confirmPass = 'this field is required';
  }

  if(!validator.equals(password, confirmPass)) {
    errors.confirmPass = 'password must match';
  }

  if(Object.keys(errors).length === 0) {
    isValid = true;
    console.log('PASSED! from api.js');
  }

  return {
    errors,
    isValid: isValid
  };
}

export const validatePersonalForm = (data) => {
  const { fname, lname, location, subjects, summary } = data;
  let errors = {}; let isValid = false;

  if(validator.isEmpty(fname)) {
    errors.fname = 'cannot be empty';
  }

  if(validator.isEmpty(lname)) {
    errors.lname = 'cannot be empty';
  }

  if(validator.isEmpty(location)) {
    errors.location = 'cannot be empty';
  }

  if(subjects === 0) {
    errors.subjects = 'choose at least one subject';
  }

  if(validator.isEmpty(summary)) {
    errors.summary = 'cannot be empty';
  }

  if(Object.keys(errors).length === 0) {
    isValid = true;
  }

  return {
    errors,
    isValid: isValid
  };

}