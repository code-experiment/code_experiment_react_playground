import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

function PrivateRoute({ children, ...rest }: any) {
  const authContext = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authContext?.isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
