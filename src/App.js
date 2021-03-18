import React, { Component } from 'react';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import AppRouter from './routers/AppRouter';
import { store } from './store/configureStore';
import setAuthToken from './helpers/setAuthToken';
import { saveUserData } from './auth/AuthActions';
import { logoutUser } from './components/login/LoginActions';
import history from './history/history';
import './App.css';

window.App = store;
window.App.serverPath = 'http://localhost:4000/';
// window.App.route = 'http://localhost:3000/';

// check for token in local storage
const token = localStorage.skrzatAppJWTToken;

if (token) {
  setAuthToken(token);
  const decodedUserFromToken = jwtDecode(token);
  store.dispatch(saveUserData(decodedUserFromToken));

  const currentTime = Date.now() / 1000;
  if (decodedUserFromToken < currentTime) {
    store.dispatch(logoutUser(history.push));
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App;
