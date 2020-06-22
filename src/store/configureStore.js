import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import fairyTalesReducer from '../components/fairyTales/fairyTalesListReducer';
import errorModalReducer from '../components/abstr/errorModal/errorModalReducer';
import employeesReducer from '../components/employees/EmployeesListReducer';
import teamsReducer from '../components/teams/teamsReducer';
import venuesReducer from '../components/venues/venuesListReducer';
import eventsReducer from '../components/events/eventsListReducer';

const root = combineReducers({
  fairyTales: fairyTalesReducer,
  errorModal: errorModalReducer,
  employees: employeesReducer,
  teams: teamsReducer,
  venues: venuesReducer,
  events: eventsReducer,
});

export const store = createStore(root, applyMiddleware(thunk));
