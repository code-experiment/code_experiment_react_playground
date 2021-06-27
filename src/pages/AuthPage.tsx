import * as React from "react";
import ButtonLink from "../components/ButtonLink";
import wave from '../images/login_signup_bottom_wave_placeholder.png'

const AuthPage = () => {
  return (
    <div>
      <h1>Welcome to my todo</h1>
      <ButtonLink text="Login" route={"/login"} />
      <ButtonLink text="Sign Up" route={"/sign-up"} />
      <img src={wave} alt="wave" />
    </div>
  );
};

export default AuthPage;
