import { combineReducers } from 'redux';
import EmployeesFormReducer from './edit/employeesFormReducer';
import listReducer from '../abstr/HOCList/HOCListReducer';

export const prefix = 'EMPLOYEES_LIST';

export default combineReducers({
  list: listReducer({
    prefix,
  }),
  form: EmployeesFormReducer,
});
