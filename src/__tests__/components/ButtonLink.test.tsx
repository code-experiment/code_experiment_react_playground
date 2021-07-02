import React from "react";
import { render, screen } from '../../utils/test-utils';
import ButtonLink from "../../components/ButtonLink";


test("ButtonLink renders correctly with the correct text and href", () => {
  render(<ButtonLink text="test" route="/" />);

  const buttonLinkElement = screen.getByRole("link", { name: "test" });

  expect(buttonLinkElement).toBeInTheDocument();
  expect(buttonLinkElement.innerHTML).toEqual('test')
  expect(buttonLinkElement).toHaveAttribute('href')
  expect(buttonLinkElement.getAttribute('href')).toEqual('/')
});
