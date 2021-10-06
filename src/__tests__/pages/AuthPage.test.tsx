import React from "react";
import { render, screen } from "../../utils/test-utils";
import AuthPage from "../../pages/AuthPage";

test("Renders Login Link", () => {
  render(<AuthPage />);
  const loginLink = screen.getByRole("link", { name: "Log In" });
  expect(loginLink).toBeInTheDocument();
});

test("Renders Sign Up Link", () => {
  render(<AuthPage />);
  const signupLink = screen.getByRole("link", { name: "Sign Up" });
  expect(signupLink).toBeInTheDocument();
});
