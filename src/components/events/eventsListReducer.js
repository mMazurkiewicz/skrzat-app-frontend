import { combineReducers } from 'redux';
import eventsFormReducer from './edit/eventsFormReducer';
import listReducer from '../abstr/HOCList/HOCListReducer';

export const prefix = 'EVENTS_LIST_';

const eventsDefaultState = {
  loading: false,
  items: [],
  anchorEl: [],
};

export default combineReducers({
  list: listReducer({
    prefix,
    defaultState: eventsDefaultState,
  }),
  form: eventsFormReducer,
});
