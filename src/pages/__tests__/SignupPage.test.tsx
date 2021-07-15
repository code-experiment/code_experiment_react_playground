import { render, screen } from "@testing-library/react";
import SignupPage from "../SignupPage";

test("Auth Form Renders Correctly", () => {
  render(<SignupPage />);

  const emailInput = screen.getByRole("textbox", { name: "Email" });
  const passwordInput = screen.getByRole("textbox", { name: "Password" });
  const confirmPasswordInput = screen.getByRole("textbox", {
    name: "Confirm password",
  });
  const signUpButton = screen.getByRole("button", { name: "Sign Up" });

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(confirmPasswordInput).toBeInTheDocument();
  expect(signUpButton).toBeInTheDocument();
});
