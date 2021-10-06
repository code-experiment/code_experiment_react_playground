import * as React from "react";

export interface Props {
  text: string;
  onClick: () => void;
  styles?: {};
}

const Button = (props: Props) => {
  return (
    <button
      className="main-button"
      style={props.styles}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
