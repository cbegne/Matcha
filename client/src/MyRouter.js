import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import FinalSignUp from './General/containers/FinalSignUp.js';
import Forgot from './General/containers/Forgot.js';
import NewPassword from './General/containers/NewPassword.js';
import HomePage from './HomePage/containers/HomePage.js';
import App from './App.js';
import { PrivateRoute, PublicRoute } from './PrivateRoute.js';
import { UnavailablePage, ClosedAccount } from './General/components/NoPage.js';

import InitDb from './General/InitDb.js';

class MyRouter extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={HomePage} />
          <PublicRoute exact path="/oubli" component={Forgot} />
          <Route exact path="/change/:token" component={NewPassword} />
          <Route exact path="/auth/:token" component={FinalSignUp} />
          <Route exact path="/init" component={InitDb} />
          <Route exact path="/close" component={ClosedAccount} />
          <PrivateRoute path="*" component={App} />
          <Route path="*" component={UnavailablePage} />
        </Switch>
      </Router>
    );
  }
}

export default MyRouter;
