import { createStore, combineReducers } from 'redux';
import fairyTalesReducer from '../components/fairyTales/fairyTalesReducer';

export default () => {
  const store = createStore(
    combineReducers({
      fairyTales: fairyTalesReducer,
    })
  );

  return store;
}