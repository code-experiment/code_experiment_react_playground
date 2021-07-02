// TODO:  Research further as I might be wrong
import { render} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "../contexts/AuthContext";

function AppProviders({children}) {
  return (
    <Router>
      <AuthContextProvider>{children}</AuthContextProvider>
    </Router>
  )
}

const customRender = (ui, { route = "/" } = {}, options) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: AppProviders, ...options });
};

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }