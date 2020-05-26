import React from "react";
import { Router, Route, Switch } from 'react-router-dom';
import Header from '../components/header/Header';
import history from '../history/history.js';
import FairyTalesList from "../components/fairyTales/FairyTalesList.js";

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Header />
            <Switch>
                <Route path='/fairyTales' component={FairyTalesList} />
            </Switch>
        </div>
    </Router>
)

export default AppRouter;