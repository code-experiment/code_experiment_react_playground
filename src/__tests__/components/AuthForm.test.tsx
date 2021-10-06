// TODO:  Need to finish figuring out how to mock form submissions.
//        - I already have some good functionality with Mock Service Workin on the app flow but I want to try some jest stuff
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

describe("Auth Form Renders Correct Errors", () => {
  beforeEach(() => {
    render(<AuthForm signup />);
  });

  test("Submiting form with empty fields renders correct errors", async () => {
    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    userEvent.click(submitButton);

    const emailError = await screen.findByText("You must specify an Email");
    const passwordError = await screen.findByText(
      "You must specify a password"
    );
    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });

  test("Please supply a valid email address error appears", async () => {
    const email = "invalidEmail";
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    userEvent.type(emailInput, email);
    userEvent.click(submitButton);

    const emailError = await screen.findByText(
      "Please supply a valid email address."
    );
    expect(emailError).toBeInTheDocument();
  });

  test("Password must have at least 8 characters error appears", async () => {
    const password = "1234567";
    const passwordInput = screen.getByText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    userEvent.type(passwordInput, password);
    userEvent.click(submitButton);

    const passwordError = await screen.findByText(
      "Password must have at least 8 characters"
    );
    expect(passwordError).toBeInTheDocument();
  });

  test("The passwords do not match error appears", async () => {
    const password = "12345678";
    const passwordRepeat = password.slice(0, -1);
    const passwordInput = screen.getByText("Password");
    const passwordRepeatInput = screen.getByText("Confirm password");
    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    userEvent.type(passwordInput, password);
    userEvent.type(passwordRepeatInput, passwordRepeat);
    userEvent.click(submitButton);

    const passwordMatchError = await screen.findByText(
      "The passwords do not match"
    );
    expect(passwordMatchError).toBeInTheDocument();
  });
});
