import * as React from "react";
import Authform from "../components/AuthForm";
import ButtonLink from "../components/ButtonLink";

const LoginPage = () => {
  return (
    <div className="auth-container">
      <div className="top-content">
        <h1>Welcome back</h1>
        <div>Sign in to continue</div>
      </div>
      <div className="form-wrapper">
        <Authform />
        <ButtonLink
          text="Forgot password"
          route="/forgot-password"
          styles={{ backgroundColor: "none", boxShadow: "none" }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
