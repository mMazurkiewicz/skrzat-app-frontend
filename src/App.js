import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import { store } from './store/configureStore';

window.App = store;
window.App.serverPath = 'http://localhost:4000/';
window.App.route = 'http://localhost:3000/';

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
