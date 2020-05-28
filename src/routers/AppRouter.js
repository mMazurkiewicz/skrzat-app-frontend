import React from "react";
import { Router, Route, Switch } from 'react-router-dom';
import Header from '../components/header/Header';
import history from '../history/history.js';
import FairyTalesList from "../components/fairyTales/FairyTalesList.js";
import FairyTalesForm from "../components/fairyTales/edit/FairyTalesForm";
import ErrorModal from '../components/abstr/errorModal/ErrorModal';

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Header />
            <Switch>
                <Route path='/fairyTales' exact component={FairyTalesList} />
                <Route path='/fairyTales/:id' exact component={FairyTalesForm} />
            </Switch>
            <ErrorModal />
        </div>
    </Router>
)

export default AppRouter;