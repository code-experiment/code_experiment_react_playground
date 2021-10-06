import * as React from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";

// Got the idea for this type of app from https://kentcdodds.com/blog/authentication-in-react-applications
function App() {
  const { user } = useAuth();
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
