import { combineReducers } from 'redux';
import fairyTalesFormReducer from './edit/fairyTalesFormReducer';
import listReducer from '../abstr/HOCList/HOCListReducer';

export const prefix = 'FAIRYTALES_LIST_';

export default combineReducers({
  list: listReducer({
    prefix,
  }),
  form: fairyTalesFormReducer,
});
