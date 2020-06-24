import React from 'react';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import Header from '../components/header/Header';
import history from '../history/history.js';
import FairyTalesListComponent from '../components/fairyTales/FairyTalesList.js';
import FairyTalesFormComponent from '../components/fairyTales/edit/FairyTalesForm';
import ErrorModalComponent from '../components/abstr/errorModal/ErrorModal';
import EmployeesListComponent from '../components/employees/EmployessList';
import EmployeesFormComponent from '../components/employees/edit/EmployeesForm';
import TeamsListComponent from '../components/teams/TeamsList';
import TeamsFormComponent from '../components/teams/edit/TeamsForm';
import VenuesListComponent from '../components/venues/VenuesList';
import VenuesFormComponent from '../components/venues/edit/VenuesForm';
import EventsListComponent from '../components/events/EventsList';
import EventsFormComponent from '../components/events/edit/EventsForm';

const AppRouter = () => (
  <Router history={history}>
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/events" exact component={EventsListComponent} />
          <Route path="/events/:id" exact component={EventsFormComponent} />

          <Route path="/venues" exact component={VenuesListComponent} />
          <Route path="/venues/:id" exact component={VenuesFormComponent} />

          <Route path="/teams" exact component={TeamsListComponent} />
          <Route path="/teams/:id" exact component={TeamsFormComponent} />

          <Route path="/employees" exact component={EmployeesListComponent} />
          <Route
            path="/employees/:id"
            exact
            component={EmployeesFormComponent}
          />

          <Route path="/fairyTales" exact component={FairyTalesListComponent} />
          <Route
            path="/fairyTales/:id"
            exact
            component={FairyTalesFormComponent}
          />
        </Switch>
        <ErrorModalComponent />
      </div>
    </BrowserRouter>
  </Router>
);

export default AppRouter;
