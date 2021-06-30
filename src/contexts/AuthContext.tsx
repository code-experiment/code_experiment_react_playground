import * as React from "react";

export interface authContext {
  status: string;
  error: null | string;
  user: null | {};
  login: (token: string) => void;
}

export const AuthContext = React.createContext<authContext | null>(null);

export default AuthContext;
