import React from "react";
import { render, screen } from "../../utils/test-utils";
import LoginPage from "../../pages/LoginPage";

// test("LoginPage renders correctly", () => {
//   render(<LoginPage />);
//   const title = screen.getByRole("heading", { name: "Welcome back" });
//   expect(title).toBeInTheDocument();
// });

// test("Forgot Password Link Is On The Page", () => {
//   render(<LoginPage />);

// })

describe("LoginPage Renders Correct Items", () => {
  beforeEach(() => {
    render(<LoginPage />);
  });

  test("Correct Heading", () => {
    const title = screen.getByRole("heading", { name: "Welcome back" });
    expect(title).toBeInTheDocument();
  });

  test("Correct form fields", () => {
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const passwordInput = screen.getByText("Password");
    const loginButton = screen.getByRole("button", { name: "Log in" });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
