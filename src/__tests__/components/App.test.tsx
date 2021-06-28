import React from "react";
import { screen } from "@testing-library/react";
import { renderWithRouter } from '../utils/utils';
import App from "../../components/App";

test("The root route redirects unauthorized users to the auth page", () => {
  renderWithRouter(<App />);
  expect(screen.getByText("Welcome to my todo")).toBeInTheDocument();
});

// TODO:  Create test for root route allows authorizes users

test("The auth route renders the Auth page", () => {
  renderWithRouter(<App />, { route: "/auth" });
  expect(screen.getByText("Welcome to my todo")).toBeInTheDocument();
});

test("The login route renders the Login page", () => {
  renderWithRouter(<App />, { route: "/login" });
  expect(screen.getByText("LoginPage")).toBeInTheDocument();
});

test("The sign-up route renders the Signup page", () => {
  renderWithRouter(<App />, { route: "/sign-up" });
  expect(screen.getByText("SignupPage")).toBeInTheDocument();
});