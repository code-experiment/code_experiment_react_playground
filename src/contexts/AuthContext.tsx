import * as React from "react";

export interface IauthContext {
  status: string;
  error: null | string;
  user: null | {};
  login: (token: string) => void;
}

export const AuthContext = React.createContext<IauthContext | null>(null);

export default AuthContext;
