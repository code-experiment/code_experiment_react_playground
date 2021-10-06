import * as React from "react";
import Authform from "../components/AuthForm";

const SignupPage = () => {
  return (
    <div className="auth-container">
      <div className="top-content">
        <h1>Create account</h1>
        <div>Sign up to continue</div>
      </div>
      <Authform signup />
    </div>
  );
};

export default SignupPage;
