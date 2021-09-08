import * as React from "react";
import ButtonLink from "../components/ButtonLink";
import wave from "../images/login_signup_bottom_wave_placeholder.png";

const AuthPage = () => {
  return (
    <div className="two-row-container">
      <div className="top-content">
        <h1>TODO APP</h1>
        <h2>Welcome to my todos</h2>
        <p>Whats going to happen tomorrow?</p>
      </div>
      <div
        className="bottom-content"
        style={{ backgroundImage: `url(${wave})` }}
      >
        <div className="button-wrapper">
          <ButtonLink text="Log In" route={"/login"} />
          <ButtonLink
            text="Sign Up"
            styles={{
              backgroundColor: "transparent",
              boxShadow: "none",
              color: "white",
            }}
            route={"/sign-up"}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
