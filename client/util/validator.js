import validator from 'validator';

export function validateLogin(data) {
  const errors = {};

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Email is not valid';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'The password need to be at least 6 characters long';
  }

  return errors;
}

export function validateRegister(data) {
  let errors = {};
  errors = validateLogin(data);

  if (data.password !== data.password_confirmation) {
    errors.password = 'Passwords must match';
    errors.password_confirmation = 'Passwords must match';
  }

  if (!data.username) {
    errors.username = 'The username is required';
  } else if (data.username.length < 3) {
    errors.username = 'The username must be at least 3 characters long';
  }

  return errors;
}

