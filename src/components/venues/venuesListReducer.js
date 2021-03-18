import { combineReducers } from 'redux';
import venuesFormReducer from './edit/venuesFormReducer';
import listReducer from '../abstr/HOCList/HOCListReducer';

export const prefix = 'VENUES_LIST_';

const venuesDefaultState = {
  loading: false,
  items: [],
  anchorEl: [],
};

export default combineReducers({
  list: listReducer({ prefix, defaultState: venuesDefaultState }),
  form: venuesFormReducer,
});
