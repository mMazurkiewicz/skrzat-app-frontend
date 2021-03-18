import { prefix } from './TeamsForm';

const teamsDefaultState = {
  loading: false,
  editMode: false,
  item: {
    name: '',
    members: [],
    color: '#aa00ff',
  },
  employeesOptions: [],
};

export default (state = teamsDefaultState, action) => {
  switch (action.type) {
    case `${prefix}SAVE_EMPLOYESS_OPTIONS`:
      return {
        ...state,
        employeesOptions: action.options,
      };

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
    case `${prefix}HANDLE_MULTIPLE_CHANGE`:
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
        ...teamsDefaultState,
      };
    default:
      return state;
  }
};
