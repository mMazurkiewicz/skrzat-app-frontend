import { combineReducers } from 'redux';
import fairyTalesFormReducer from './edit/fairyTalesFormReducer';
import { prefix } from './FairyTalesList';

const fairyTalesDefaultState = {
  loading: false,
  items: [],
};

export const listReducer = (state = fairyTalesDefaultState, action) => {
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
  form: fairyTalesFormReducer,
});
