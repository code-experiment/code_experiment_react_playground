import React from "react";
import { render, screen } from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import AuthForm from "../../components/AuthForm";

test("AuthForm renders defaults correctly", () => {
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

// Submiting form with empty fields renders errors and isn't submitted
// You must specify an Email and You must specify a password
// TODO:  Need to finish figuring out how to mock form submissions
test("Submiting form with empty fields renders errors", async () => {
  render(<AuthForm signup />);
  const submitButton = screen.getByRole("button", { name: "Sign Up" });
  userEvent.click(submitButton);

  const emailError = await screen.findByText("You must specify an Email");
  const passwordError = await screen.findByText("You must specify a password");
  expect(emailError).toBeInTheDocument();
  expect(passwordError).toBeInTheDocument();
});

// Please supply a valid email address.

// Password must have at least 8 characters

// Passwords match (The passwords do not match)
