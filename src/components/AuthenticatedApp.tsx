import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../pages/HomePage";
import NoMatch from "../pages/NoMatch";
import ProfilePage from "../pages/ProfilePage";
import Navbar from "./Navbar";

function AuthenticatedApp() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={ProfilePage} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default AuthenticatedApp;
