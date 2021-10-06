import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import NoMatch from "../pages/NoMatch";

function UnauthenticatedApp() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AuthPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/sign-up" component={SignupPage} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default UnauthenticatedApp;
