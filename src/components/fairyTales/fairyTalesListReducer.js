import { combineReducers } from 'redux';
import fairyTalesFormReducer from './edit/fairyTalesFormReducer';
import listReducer from '../abstr/HOCList/HOCListReducer';

export const prefix = 'FAIRYTALES_LIST_';

const fairyTalesDefaultState = {
  loading: false,
  items: [],
  anchorEl: [],
};

export default combineReducers({
  list: listReducer({
    prefix,
    defaultState: fairyTalesDefaultState,
  }),
  form: fairyTalesFormReducer,
});
