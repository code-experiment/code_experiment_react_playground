// TODO:  Need to figure out how to test an authenticated user
import React from "react";
import { render, screen, waitFor, handlers } from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
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

// TODO: Login/Sign-up
//  - Unsuccessful
//     - When a network error happens the correct error message appears 'Network Error'

describe("Mock Form Submissions for Login", () => {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    localStorage.clear();
  });
  afterAll(() => server.close());

  test("When a user successfully logs in they are taken to the homepage", async () => {
    render(<App />, { route: "/login" });
    const email = "valid-user@valid.com";
    const password = "12345678";

    const emailInput = await screen.findByRole("textbox", { name: "Email" });
    const passwordInput = await screen.findByText("Password");
    const submitButton = await screen.findByRole("button", { name: "Log in" });
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(submitButton);

    await waitFor(() => screen.findByText("Home"));
  });

  test("When a user inputs an incorrect username or password the correct error message appears", async () => {
    server.use(
      rest.post("/login", (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({ detail: "Incorrect username or password." })
        );
      })
    );
    render(<App />, { route: "/login" });
    const email = "valid-user@valid.com";
    const password = "12345678";

    const emailInput = await screen.findByRole("textbox", { name: "Email" });
    const passwordInput = await screen.findByText("Password");
    const submitButton = await screen.findByRole("button", { name: "Log in" });
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(submitButton);

    await waitFor(() => screen.findByText("Incorrect username or password."));
  });
});

describe("Mock Form Submissions for Signup", () => {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    localStorage.clear();
  });
  afterAll(() => server.close());

  test("When a user successfully signs up they are taken to the homepage", async () => {
    render(<App />, { route: "/sign-up" });
    const email = "valid-user@valid.com";
    const password = "12345678";

    const emailInput = await screen.findByRole("textbox", { name: "Email" });
    const passwordInput = await screen.findByText("Password");
    const passwordRepeatInput = await screen.findByText("Confirm password");
    const submitButton = await screen.findByRole("button", { name: "Sign Up" });
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.type(passwordRepeatInput, password);
    userEvent.click(submitButton);

    await waitFor(() => screen.findByText("Home"));
  });

  test("When a username is already taken the correct error message appears", async () => {
    server.use(
      rest.post("/create-user", (req, res, ctx) => {
        return res(ctx.status(409), ctx.json({ detail: "Username Taken" }));
      })
    );
    render(<App />, { route: "/sign-up" });
    const email = "valid-user@valid.com";
    const password = "12345678";

    const emailInput = await screen.findByRole("textbox", { name: "Email" });
    const passwordInput = await screen.findByText("Password");
    const passwordRepeatInput = await screen.findByText("Confirm password");
    const submitButton = await screen.findByRole("button", { name: "Sign Up" });
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.type(passwordRepeatInput, password);
    userEvent.click(submitButton);

    await waitFor(() => screen.findByText("Username Taken"));
  });
});
