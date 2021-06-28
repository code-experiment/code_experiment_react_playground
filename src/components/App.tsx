import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import Home from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
        <Route path="/auth" component={AuthPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/sign-up" component={SignupPage} />
      </Switch>
    </Router>
  );
}

export default App;
