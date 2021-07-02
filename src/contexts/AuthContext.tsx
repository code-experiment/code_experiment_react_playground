// TODO:  Possibly change from useState to useReducer
import * as React from "react";
import axios from "axios";

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
    checkLogin(token);
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

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
}

export { AuthContextProvider, useAuth };
