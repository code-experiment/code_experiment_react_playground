// TODO:  Need to finish figuring out how to mock form submissions.  Look into jest.
import React from "react";
import { render, screen, waitFor, handlers } from "../../utils/test-utils";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import AuthForm from "../../components/AuthForm";
import App from "../../components/App";

test("AuthForm renders defaults correctly", () => {
  render(<AuthForm />);
  const emailInput = screen.getByRole("textbox", { name: "Email" });
  const passwordInput = screen.getByText("Password");
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test("AuthForm renders correctly with signup prop", () => {
  render(<AuthForm signup />);
  const emailInput = screen.getByRole("textbox", { name: "Email" });
  const passwordInput = screen.getByText("Password");
  const passwordRepeatInput = screen.getByText("Confirm password");
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(passwordRepeatInput).toBeInTheDocument();
});

describe("Auth Form Renders Correct Errors", () => {
  beforeEach(() => {
    render(<AuthForm signup />);
  });

  test("Submiting form with empty fields renders correct errors", async () => {
    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    userEvent.click(submitButton);

    const emailError = await screen.findByText("You must specify an Email");
    const passwordError = await screen.findByText(
      "You must specify a password"
    );
    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });

  test("Please supply a valid email address error appears", async () => {
    const email = "invalidEmail";
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    userEvent.type(emailInput, email);
    userEvent.click(submitButton);

    const emailError = await screen.findByText(
      "Please supply a valid email address."
    );
    expect(emailError).toBeInTheDocument();
  });

  test("Password must have at least 8 characters error appears", async () => {
    const password = "1234567";
    const passwordInput = screen.getByText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    userEvent.type(passwordInput, password);
    userEvent.click(submitButton);

    const passwordError = await screen.findByText(
      "Password must have at least 8 characters"
    );
    expect(passwordError).toBeInTheDocument();
  });

  test("The passwords do not match error appears", async () => {
    const password = "12345678";
    const passwordRepeat = password.slice(0, -1);
    const passwordInput = screen.getByText("Password");
    const passwordRepeatInput = screen.getByText("Confirm password");
    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    userEvent.type(passwordInput, password);
    userEvent.type(passwordRepeatInput, passwordRepeat);
    userEvent.click(submitButton);

    const passwordMatchError = await screen.findByText(
      "The passwords do not match"
    );
    expect(passwordMatchError).toBeInTheDocument();
  });
});

// TODO:  Possibly look into how he is doing jest mock instead of the current way that I'm doing it
// https://claritydev.net/blog/testing-react-hook-form-with-react-testing-library/

// TODO:  Possibly I can use the jest mock for making sure the function gets called like the stuff above
//        and the Mock Service Worker from below for making sure the user is directed correctly could live in the app test file

// Login
//  - Unsuccessful
//     - When a network error happens the correct error message appears 'Network Error'
//     - When a user inputs an incorrect username or password the correct error message appears 'Incorrect username or password.'
//  - Success
//     - When a user successfully logs in they are taken to the homepage

// Signup
// - Unsuccessful
//   - When a username is taken the correct error message appears 'Username Taken'
//   - Network Error Test
// - Success
//   - When a user successfully signs up they are taken to the homepage

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
