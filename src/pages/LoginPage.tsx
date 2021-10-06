import * as React from "react";
import Authform from "../components/AuthForm";

const LoginPage = () => {
  return (
    <div className="auth-container">
      <div className="top-content">
        <h1>Welcome back</h1>
        <div>Sign in to continue</div>
      </div>
      <Authform />
    </div>
  );
};

export default LoginPage;
