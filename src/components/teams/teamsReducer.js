import { combineReducers } from 'redux';
import teamsFormReducer from './edit/teamsFormReducer';
import listReducer from '../abstr/HOCList/HOCListReducer';

export const prefix = 'TEAMS_LIST_';

const teamsDefaultState = {
  loading: false,
  items: [],
  anchorEl: [],
};

export default combineReducers({
  list: listReducer({
    prefix,
    defaultState: teamsDefaultState,
  }),
  form: teamsFormReducer,
});
