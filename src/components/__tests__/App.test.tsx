import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "../../utils/test-utils";
import App from "../App";

test("Make sure the Login button appears for root route", () => {
  render(<App />);

  const loginButton = screen.getByRole("button", { name: "Login" });

  expect(loginButton).toBeInTheDocument();
});

test("Make sure the Sign Up button appears for root route", () => {
  render(<App />);

  const signUpButton = screen.getByRole("button", { name: "Sign Up" });

  expect(signUpButton).toBeInTheDocument();
});

test("Make sure the Wave image appears for root route", () => {
  render(<App />);

  const waveImage = screen.getByRole("img", { name: "wave" });

  expect(waveImage).toBeInTheDocument();
});

test("When I click the login button it takes me to the login page", () => {
  renderWithRouter(<App />);

  userEvent.click(screen.getByRole("button", { name: "Login" }));

  expect(screen.getByText("login page")).toBeInTheDocument();
});

test("When I click the sign-up button it takes me to the sign-up page", () => {
  renderWithRouter(<App />);

  userEvent.click(screen.getByRole("button", { name: "Sign Up" }));

  expect(screen.getByText("Create account")).toBeInTheDocument();
});

//TODO: Decide if I should use this type of testing or the button type above
test("When a user goes to the route /sign-up the sign-up page renders", () => {
  renderWithRouter(<App />, { route: "/sign-up" });

  expect(screen.getByText("Create account")).toBeInTheDocument();
});

test("When a user goes to the route /login the Login page renders", () => {
  renderWithRouter(<App />, { route: "/login" });

  expect(screen.getByText("login page")).toBeInTheDocument();
});
