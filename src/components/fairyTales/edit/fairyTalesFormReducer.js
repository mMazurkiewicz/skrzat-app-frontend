import { prefix } from './FairyTalesForm';

const fairyTaleDefaultState = {
  loading: false,
  editMode: false,
  item: {
    name: '',
    description: '',
  },
};

export default (state = fairyTaleDefaultState, action) => {
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
        ...fairyTaleDefaultState,
      };
    default:
      return state;
  }
};
