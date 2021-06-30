import * as React from "react";
import {AuthContext} from '../contexts/AuthContext';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

// Got the idea for this type of app from https://kentcdodds.com/blog/authentication-in-react-applications
function App() {
  const authContext = React.useContext(AuthContext);
  return authContext?.user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default App;
