import * as React from "react";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { logout } = useAuth();
  return (
    <div>
      <h1>Home</h1>
      <Button text="Logout" onClick={logout}/>
    </div>
  );
};

export default Home;
