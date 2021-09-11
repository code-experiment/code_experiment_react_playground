import React from "react";
import { render, screen } from "../../utils/test-utils";
import AuthForm from "../../components/AuthForm";

test("AuthForm renders correctly", () => {
  render(<AuthForm />);
  const emailInput = screen.getByRole("textbox", { name: "Email" });
  const passwordInput = screen.getByText("Password");
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test("AuthForm renders correctly with signup prop", () => {
  render(<AuthForm signup />);
  const emailInput = screen.getByRole("textbox", { name: "Email" });
  const passwordInput = screen.getByText("Password");
  const passwordRepeatInput = screen.getByText("Confirm password");
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(passwordRepeatInput).toBeInTheDocument();
});
