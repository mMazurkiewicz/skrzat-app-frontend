import { prefix } from './EmployeesFormActions';

const employeesDefaultState = {
  loading: false,
  editMode: false,
  item: {
    name: '',
    mail: '',
    phoneNumber: '',
  },
};

export default (state = employeesDefaultState, action) => {
  switch (action.type) {
    case `${prefix}SAVE_ITEM_FROM_SERVER`:
      return {
        ...state,
        item: action.item,
      };
    case `${prefix}HANDLE_CHANGE`:
      return {
        ...state,
        item: {
          ...state.item,
          [action.field]: action.value,
        },
      };
    case `${prefix}TOGGLE_EDIT`:
      return {
        ...state,
        editMode: action.toggle,
      };
    case `${prefix}RESET_STATE`:
      return {
        ...employeesDefaultState,
      };
    default:
      return state;
  }
};
