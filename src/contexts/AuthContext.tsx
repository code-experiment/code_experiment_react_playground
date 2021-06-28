import { createContext } from "react";

export interface AuthContextInterface {
  isLoggedIn: boolean;
  checkLogin: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export default AuthContext;
