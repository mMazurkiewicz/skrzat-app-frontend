import { prefix } from './authReducer';

export const saveUserData = (user) => ({
  type: `${prefix}SAVE_USER_DATA`,
  user,
});

export const resetState = () => ({
  type: `${prefix}RESET_STATE`,
});
