import React from "react";
import { render, screen, handlers } from "../../utils/test-utils";
import { setupServer } from "msw/node";
import App from "../../components/App";
import ProfilePage from "../../pages/ProfilePage";

describe("Profile", () => {
  test("Correct Heading", async () => {
    render(<ProfilePage />, { route: "/profile" });
    const logoutBtn = screen.getByRole("button", { name: "Logout" });
    expect(logoutBtn).toBeInTheDocument();
  });
});

// TODO: Look into how to test a logged in user
describe.skip("Profile Page Renders Correct", () => {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    localStorage.clear();
  });
  afterAll(() => server.close());

  test("Correct Heading", async () => {
    render(<App />, { route: "/profile" });
    const title = screen.getByRole("heading", { name: "My Profile" });
    const logoutBtn = screen.getByRole("button", { name: "Logout" });
    const email = screen.getByText("email");
    expect(title).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  test("Logout button logs the user out", () => {
    // Look at local storage and make sure the token is gone
  });
});
