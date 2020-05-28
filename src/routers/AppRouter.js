import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from '../components/header/Header';
import history from '../history/history.js';
import FairyTalesListComponent from '../components/fairyTales/FairyTalesList.js';
import FairyTalesFormComponent from '../components/fairyTales/edit/FairyTalesForm';
import ErrorModalComponent from '../components/abstr/errorModal/ErrorModal';
import EmployeesListComponent from '../components/employees/EmployessList';

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/fairyTales" exact component={FairyTalesListComponent} />
        <Route
          path="/fairyTales/:id"
          exact
          component={FairyTalesFormComponent}
        />

        <Route path="/employees" exact component={EmployeesListComponent} />
      </Switch>
      <ErrorModalComponent />
    </div>
  </Router>
);

export default AppRouter;
