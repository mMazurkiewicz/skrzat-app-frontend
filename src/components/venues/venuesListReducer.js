import { combineReducers } from 'redux';
import venuesFormReducer from './edit/venuesFormReducer';

const venuesDefaultState = {
  loading: false,
  items: [],
};

export const prefix = 'VENUES_LIST_';

export const listReducer = (state = venuesDefaultState, action) => {
  switch (action.type) {
    case `${prefix}SAVE_ITEMS_FROM_SERVER`:
      return {
        ...state,
        items: action.items,
      };
    case `${prefix}TOGGLE_LOADING`:
      return {
        ...state,
        loading: action.toggle,
      };
    default:
      return state;
  }
};

export default combineReducers({
  list: listReducer,
  form: venuesFormReducer,
});
