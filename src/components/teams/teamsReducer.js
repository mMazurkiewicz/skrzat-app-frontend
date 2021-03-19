import { combineReducers } from 'redux';
import teamsFormReducer from './edit/teamsFormReducer';
import listReducer from '../abstr/HOCList/HOCListReducer';

export const prefix = 'TEAMS_LIST_';

export default combineReducers({
  list: listReducer({
    prefix,
  }),
  form: teamsFormReducer,
});
