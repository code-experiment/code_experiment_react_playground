// TODO:  Possibly change from useState to useReducer
import * as React from "react";
import axios, { AxiosError } from "axios";

interface IauthContext {
  status: string;
  error: null | string;
  user: null | {};
  login: (token: string) => void;
  logout: () => void;
}

interface authContextState {
  status: string;
  error: null | string;
  user: null | {};
}

const AuthContext = React.createContext<IauthContext | undefined>(undefined);
const API_URL = "http://localhost:8000/check-login";

const AuthContextProvider = (props: any) => {
  const [state, setState] = React.useState<authContextState>({
    status: "pending",
    error: null,
    user: null,
  });

  const checkLogin = React.useCallback((token: string) => {
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
        handleAxiosError(error);
      });
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("code_experiment_secure_token");
    if (token) {
      checkLogin(token);
    } else {
      setState({ status: "success", error: null, user: null });
    }
  }, [checkLogin]);

  const login = (token: string) => {
    localStorage.setItem("code_experiment_secure_token", token);
    checkLogin(token);
  };

  const logout = () => {
    localStorage.removeItem("code_experiment_secure_token");
    setState({ status: "success", error: null, user: null });
  };

  const handleAxiosError = (error: AxiosError) => {
    if (error.response) {
      console.log(error, "client received an error response (5xx, 4xx)");
      if (error.response.statusText === "Unauthorized") {
        localStorage.removeItem("code_experiment_secure_token");
        setState({ status: "success", error: null, user: null });
      }
    } else if (error.request) {
      console.log(
        error,
        "client never received a response, or request never left"
      );
      setState({
        status: "error",
        error:
          "client never received a response, or request never left.  Try reloading or coming back later",
        user: null,
      });
    } else {
      console.log(error, "anything else");
      setState({
        status: "error",
        error:
          "Something bad happend please try reloading or coming back later",
        user: null,
      });
    }
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

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
}

export { AuthContextProvider, useAuth };
