// Fix an issue with passing functions to the Button component it gets mad about it being undefined
// I needed to pass an arrow function that would call that function in order to fix it but that seems wrong
import * as React from "react";
import Button from "../components/Button";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const authContext = React.useContext(AuthContext);
  return (
    <div>
      <h1>Home</h1>
      <button onClick={authContext?.logout}>Logout</button>
      <Button text="Logout" onClick={() => authContext?.logout()}/>
      {/* <Button text="Logout" onClick={authContext?.logout}/> */}
    </div>
  );
};

export default Home;