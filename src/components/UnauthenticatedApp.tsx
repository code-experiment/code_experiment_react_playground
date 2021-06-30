import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

function UnauthenticatedApp() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AuthPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/sign-up" component={SignupPage} />
      </Switch>
    </Router>
  );
}

export default UnauthenticatedApp;
