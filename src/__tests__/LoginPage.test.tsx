import { render, screen } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";

test("Login Page has the correct text", () => {
  render(<LoginPage />);

  const divElement = screen.getByText("login page");

  expect(divElement).toBeInTheDocument();
});
