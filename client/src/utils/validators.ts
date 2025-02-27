import { isValidUsername } from '6pp';

export const usernameValidator = (username: string) => {
  if (!isValidUsername(username)) {
    return {isValid: false, errorMessage: "Invalid username"};
  };
}