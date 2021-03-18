import { combineReducers } from 'redux';
import EmployeesFormReducer from './edit/employeesFormReducer';
import listReducer from '../abstr/HOCList/HOCListReducer';

export const prefix = 'EMPLOYEES_LIST';

const employeesDefaultState = {
  loading: false,
  items: [],
  anchorEl: [],
};

export default combineReducers({
  list: listReducer({
    prefix,
    defaultState: employeesDefaultState,
  }),
  form: EmployeesFormReducer,
});
