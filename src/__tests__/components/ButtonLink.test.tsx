import React from "react";
import { screen } from "@testing-library/react";
import ButtonLink from "../../components/ButtonLink";
import { renderWithRouter } from "../utils/utils";

test("ButtonLink renders correctly with the correct text and href", () => {
  renderWithRouter(<ButtonLink text="test" route="/" />);

  const buttonLinkElement = screen.getByRole("link", { name: "test" });

  expect(buttonLinkElement).toBeInTheDocument();
  expect(buttonLinkElement.innerHTML).toEqual('test')
  expect(buttonLinkElement).toHaveAttribute('href')
  expect(buttonLinkElement.getAttribute('href')).toEqual('/')
});
