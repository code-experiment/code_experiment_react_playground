import React from "react";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../utils/utils";
import AuthPage from "../../pages/AuthPage";

test("Renders Login Link", () => {
  renderWithRouter(<AuthPage />);
  const loginLink = screen.getByRole("link", { name: "Login" });
  expect(loginLink).toBeInTheDocument();
});

test("Renders Sign Up Link", () => {
  renderWithRouter(<AuthPage />);
  const signupLink = screen.getByRole("link", { name: "Sign Up" });
  expect(signupLink).toBeInTheDocument();
});
