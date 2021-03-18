import { prefix } from './VenuesForm';

const venuesDefaultState = {
  loading: false,
  editMode: false,
  item: {
    name: '',
    street: '',
    streetNo: '',
    city: '',
    zip: '',
    postOffice: '',
    phone: '',
    website: '',
    additionalInfo: '',
    lastContact: null,
  },
};

export default (state = venuesDefaultState, action) => {
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
        ...venuesDefaultState,
      };
    default:
      return state;
  }
};
