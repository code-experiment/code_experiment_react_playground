import React from "react";
import { render, screen } from "../../utils/test-utils";
import SignupPage from "../../pages/SignupPage";

describe("SignupPage Renders Correct Items", () => {
  beforeEach(() => {
    render(<SignupPage />);
  });

  test("Correct Heading", () => {
    const title = screen.getByRole("heading", { name: "Create account" });
    expect(title).toBeInTheDocument();
  });

  test("Correct form fields", () => {
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const passwordInput = screen.getByText("Password");
    const repeatPasswordInput = screen.getByText("Confirm password");
    const loginButton = screen.getByRole("button", { name: "Sign Up" });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(repeatPasswordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
