import * as React from "react";
import Button from "../components/Button";
import wave from "../images/login_signup_bottom_wave_placeholder.png";
import { useHistory } from "react-router-dom";

const AuthPage = () => {
  let history = useHistory();
  return (
    <div className="two-row-container">
      <div className="top-content">
        <h1>TODO APP</h1>
        <h2>Welcome to my todo</h2>
        <p>What's going to happen tomorrow?</p>
      </div>
      {/* <div className="bottom-content" style={{ background: "green" }}> */}
      <div
        className="bottom-content"
        style={{ backgroundImage: `url(${wave})` }}
      >
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
      </div>
    </div>
  );
};

export default AuthPage;
