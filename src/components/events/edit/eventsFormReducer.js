export const prefix = 'EVENTS_FORM_';

const venuesDefaultState = {
  loading: false,
  editMode: false,
  item: {
    dateTime: null,
    venue: null,
    team: null,
    fairyTale: null,
  },
  venuesOptions: [],
  venuesLoading: false,
  teamsOptions: [],
  fairyTalesOptions: [],
};

export default (state = venuesDefaultState, action) => {
  switch (action.type) {
    case `${prefix}ADD_EXTRA_OPTIONS`:
      return {
        ...state,
        [action.field]: action.options,
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
    case `${prefix}HANDLE_NON_ITEM_CHANGE`:
      return {
        ...state,
        [action.field]: action.value,
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
