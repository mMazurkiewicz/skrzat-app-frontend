import { combineReducers } from 'redux';
import { prefix } from './TeamsList';
import teamsFormReducer from './edit/teamsFormReducer';

const teamsDefaultState = {
  loading: false,
  items: [],
};

export const listReducer = (state = teamsDefaultState, action) => {
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
  form: teamsFormReducer,
});
