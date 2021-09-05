import * as React from "react";
import Button from "../components/Button";
import wave from "../images/login_signup_bottom_wave_placeholder.png";
import { useHistory } from "react-router-dom";

const AuthPage = () => {
  let history = useHistory();
  return (
    <div className="container">
      <h1>Todo App</h1>
      <h2>Welcome to my todo</h2>
      <p>What's going to happen tomorrow?</p>
      <div className="button-wrapper">
        <Button text="Log In" onClick={() => history.push("/login")} />
        <Button
          text="Sign Up"
          styles={{
            backgroundColor: "transparent",
            boxShadow: "none",
            color: "white",
          }}
          onClick={() => history.push("/sign-up")}
        />
      </div>
      <img className="wave-img" src={wave} alt="wave" />
    </div>
  );
};

export default AuthPage;
