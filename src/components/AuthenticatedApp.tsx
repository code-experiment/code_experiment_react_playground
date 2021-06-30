import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../pages/HomePage";
import NoMatch from "../pages/NoMatch";

function AuthenticatedApp() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default AuthenticatedApp;
