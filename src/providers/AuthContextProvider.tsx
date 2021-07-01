import * as React from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const API_URL = "http://localhost:8000/check-login";

interface authContextState {
  status: string;
  error: null | string;
  user: null | {};
}

const AuthContextProvider = (props: any) => {
  const [state, setState] = React.useState<authContextState>({
    status: "pending",
    error: null,
    user: null,
  });

  React.useEffect(() => {
    const token = localStorage.getItem("code_experiment_secure_token");
    if (token) {
      checkLogin(token);
    } else {
      setState({ status: "success", error: null, user: null });
    }
  }, []);

  const checkLogin = (token: string) => {
    setState({ status: "pending", error: null, user: null });
    axios
      .post(API_URL, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setState({
          status: "success",
          error: null,
          user: response.data,
        });
      })
      .catch((error) => {
        console.error("Error", error.response);
        // TODO:  Look further into how to work with the errors better.
        // setState({ status: "error", error: "oops", user: null });
        if (error.response.statusText === "Unauthorized") {
          localStorage.removeItem("code_experiment_secure_token");
          setState({ status: "success", error: null, user: null });
        }
      });
  };

  const login = (token: string) => {
    localStorage.setItem("code_experiment_secure_token", token);
    checkLogin(token)
  };

  const logout = () => {
    // TODO:  Might want to do a try/catch
    localStorage.removeItem("code_experiment_secure_token");
    setState({ status: "success", error: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {state.status === "pending" ? (
        "Loading..."
      ) : state.status === "error" ? (
        <div>
          Oh no
          <div>
            <pre>{state.error}</pre>
          </div>
        </div>
      ) : (
        props.children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
