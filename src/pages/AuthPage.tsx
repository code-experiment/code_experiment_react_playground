import * as React from "react";
import Button from "../components/Button";
import wave from '../images/login_signup_bottom_wave_placeholder.png'
import { useHistory } from "react-router-dom";

const AuthPage = () => {
  let history = useHistory();
  return (
    <div>
      <Button text="Login" onClick={() => history.push("/login")} />
      <Button text="Sign Up" onClick={() => history.push("/sign-up")} />
      <img src={wave} alt="wave" />
    </div>
  );
};

export default AuthPage;
