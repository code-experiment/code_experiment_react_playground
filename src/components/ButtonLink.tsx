import * as React from "react";
import { Link } from "react-router-dom";

export interface Props {
  text: string;
  route: string;
  styles?: {};
}

const ButtonLink = (props: Props) => {
  return (
    <Link className="main-button-link" to={props.route} style={props.styles}>
      {props.text}
    </Link>
  );
};

export default ButtonLink;
