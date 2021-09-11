// TODO:  Need to figure out how to test an authenticated user
import React from "react";
import { render, screen } from "../../utils/test-utils";
import App from "../../components/App";

test("The root route redirects unauthorized users to the auth page", () => {
  render(<App />);
  expect(screen.getByText("TODO APP")).toBeInTheDocument();
});

test("The login route renders the Login page", () => {
  render(<App />, { route: "/login" });
  expect(screen.getByText("Welcome back")).toBeInTheDocument();
});

test("The sign-up route renders the Signup page", () => {
  render(<App />, { route: "/sign-up" });
  expect(screen.getByText("Create account")).toBeInTheDocument();
});
