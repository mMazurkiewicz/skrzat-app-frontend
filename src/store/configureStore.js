import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import fairyTalesReducer from '../components/fairyTales/fairyTalesListReducer';
import errorModalReducer from '../components/abstr/errorModal/errorModalReducer';

const root = combineReducers({
    fairyTales: fairyTalesReducer,
    errorModal: errorModalReducer,
});

export const store = createStore(
    root, 
    applyMiddleware(thunk)
);
