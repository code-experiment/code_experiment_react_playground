import * as React from "react";
import { Link } from "react-router-dom";

export interface Props {
  text: string;
  route: string;
}

const ButtonLink = (props: Props) => {
  return <Link to={props.route}>{props.text}</Link>;
};

export default ButtonLink;