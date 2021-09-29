// TODO:  Research further as I might be wrong
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { rest } from "msw";
import { AuthContextProvider } from "../contexts/AuthContext";

const handlers = [
  rest.post("/login", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        access_token: "valid-token",
        token_type: "bearer",
      })
    );
  }),
  rest.post("/check-login", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ username: "valid-user@valid.com", id: 1, todos: [] })
    );
  }),
];

function AppProviders({ children }) {
  return (
    <Router>
      <AuthContextProvider>{children}</AuthContextProvider>
    </Router>
  );
}

const customRender = (ui, { route = "/" } = {}, options) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: AppProviders, ...options });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render, handlers };
