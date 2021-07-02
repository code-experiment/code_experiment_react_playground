import React from "react";
import { render, screen } from '../../utils/test-utils';
import Button from "../../components/Button";
import userEvent from "@testing-library/user-event";

test("Button renders correct text and onClick works correctly", () => {
  let clicked = false;
  render(<Button text="test" onClick={() => (clicked = true)} />);

  const buttonElement = screen.getByRole("button", { name: "test" });
  userEvent.click(buttonElement);

  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement.innerHTML).toEqual('test')
  expect(clicked).toEqual(true);
});
