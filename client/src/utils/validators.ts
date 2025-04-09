import { isValidUsername, isValidEmail } from '6pp';

export const usernameValidator = (username: string) => {
  if (!isValidUsername(username)) {
    return {isValid: false, errorMessage: "Invalid username"};
  };
}

export const emailValidator = (email: string) => {
  if (!isValidEmail(email)) {
    return {isValid: false, errorMessage: "Invalid email"};
  };
  return {isValid: true, errorMessage: ""};
}