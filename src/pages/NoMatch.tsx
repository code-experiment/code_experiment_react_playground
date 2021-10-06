import * as React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div>
      <h1>Uh Oh.. This page doesn't exist</h1>
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default NoMatch;
