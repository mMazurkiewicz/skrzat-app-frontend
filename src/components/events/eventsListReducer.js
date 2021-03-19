import { combineReducers } from 'redux';
import eventsFormReducer from './edit/eventsFormReducer';
import listReducer from '../abstr/HOCList/HOCListReducer';

export const prefix = 'EVENTS_LIST_';

export default combineReducers({
  list: listReducer({
    prefix,
  }),
  form: eventsFormReducer,
});
