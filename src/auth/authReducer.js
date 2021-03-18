export const prefix = 'AUTH_';

export const authDefaultState = {
  _id: '',
  email: '',
  name: '',
  token: '',
  roles: [],
};

export default (state = authDefaultState, action) => {
  switch (action.type) {
    case `${prefix}SAVE_USER_DATA`:
      return {
        ...state,
        ...action.user,
      };
    case `${prefix}RESET_STATE`:
      return {
        ...authDefaultState,
      };
    default:
      return state;
  }
};
