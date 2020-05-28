import { prefix } from './ErrorModalActions';

const errorModalDefaultState = {
  open: false,
  message: null,
};

export default (state = errorModalDefaultState, action) => {
  switch (action.type) {
    case `${prefix}TOGGLE_MODAL`:
      return {
        ...state,
        open: action.toggle,
      };
    case `${prefix}SET_MESSAGE`:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
};
