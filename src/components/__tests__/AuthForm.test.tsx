import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "../AuthForm";

test("Auth Form Renders Correctly", () => {
  render(<AuthForm />);

  const emailInput = screen.getByRole("textbox", { name: "Email" });
  const passwordInput = screen.getByRole("textbox", { name: "Password" });
  const confirmPasswordInput = screen.getByRole("textbox", {
    name: "Confirm password",
  });
  const button = screen.getByRole("button");

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(confirmPasswordInput).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("Submit Empty Form Shows Correct Error Messages", async () => {
  render(<AuthForm />);
  const button = screen.getByRole("button");
  userEvent.click(button);
  const emailError = await screen.findByText("You must specify a Email");
  const passwordError = await screen.findByText("You must specify a Password");
  expect(emailError).toBeInTheDocument();
  expect(passwordError).toBeInTheDocument();
});

test("Confirm Password Error Message Renders when passwords don't match", async () => {
  render(<AuthForm />);
  const passwordInput = screen.getByRole("textbox", { name: "Password" });
  const confirmPasswordInput = screen.getByRole("textbox", {
    name: "Confirm password",
  });
  const button = screen.getByRole("button");

  userEvent.type(passwordInput, "abc");
  userEvent.type(confirmPasswordInput, "ab");
  userEvent.click(button);

  const confirmPasswordError = await screen.findByText(
    "The passwords do not match"
  );
  expect(confirmPasswordError).toBeInTheDocument();
});

test("Please supply a valid email address error message renders when an incorrect email is submitted", async () => {
  render(<AuthForm />);
  const emailInput = screen.getByRole("textbox", { name: "Email" });
  const button = screen.getByRole("button");

  userEvent.type(emailInput, "abc");
  userEvent.click(button);

  const emailError = await screen.findByText(
    "Please supply a valid email address."
  );
  expect(emailError).toBeInTheDocument();
});
