import { prefix } from './LoginForm';

const loginDefaultState = {
  loading: false,
  item: {
    email: '',
    password: '',
  },
};

export default (state = loginDefaultState, action) => {
  switch (action.type) {
    case `${prefix}HANDLE_CHANGE`:
      return {
        ...state,
        item: {
          ...state.item,
          [action.field]: action.value,
        },
      };
    case `${prefix}RESET_STATE`:
      return {
        ...loginDefaultState,
      };
    default:
      return state;
  }
};
