import { combineReducers } from 'redux';
import venuesFormReducer from './edit/venuesFormReducer';
import listReducer from '../abstr/HOCList/HOCListReducer';

export const prefix = 'VENUES_LIST_';

export default combineReducers({
  list: listReducer({ prefix }),
  form: venuesFormReducer,
});
