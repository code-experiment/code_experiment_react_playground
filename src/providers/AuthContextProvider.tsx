import * as React from "react";
import axios from "axios";
import { authContext, AuthContext } from "../contexts/AuthContext";

const API_URL = "http://localhost:8000/check-login";

interface authContextState {
  status: string;
  error: null | string;
  user: null | {};
}

// export const AuthContext = React.createContext<authContextState | null>(null);

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
        console.log("res", response);
        setState({
          status: "success",
          error: null,
          user: response.data,
        });
      })
      .catch((error) => {
        console.error("Error", error);
        setState({ status: "error", error: "oops", user: null });
      });
  };

  const login = (token: string) => {
    localStorage.setItem("code_experiment_secure_token", token);
    checkLogin(token)
  };

  const logout = () => {
    localStorage.removeItem("code_experiment_secure_token");
  };

  return (
    <AuthContext.Provider value={{ ...state, login }}>
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
