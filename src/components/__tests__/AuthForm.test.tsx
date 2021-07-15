import { render, screen } from "@testing-library/react";
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
