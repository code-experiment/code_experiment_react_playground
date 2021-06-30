import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {AuthContext} from '../contexts/AuthContext';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

function App() {
  const authContext = React.useContext(AuthContext);
  console.log(authContext)
  return authContext?.user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default App;
