import * as React from "react";
import axios from "axios";

import AuthContext, { AuthContextInterface } from "../contexts/AuthContext";
const API_URL = "http://localhost:8000/check-login";

const AuthContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("code_experiment_secure_token");

    if (token) {
      checkLogin(token);
    }
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("code_experiment_secure_token");
  };

  const checkLogin = (token: string) => {
    axios
      .post(API_URL, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log("res", response.data);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const stateValue: AuthContextInterface = {
    isLoggedIn,
    checkLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={stateValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
