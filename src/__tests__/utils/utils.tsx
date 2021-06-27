import { render as rtlRender } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

// this is a handy function that I would utilize for any component
// that relies on the router being in context
export const renderWithRouter = (ui: any, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return rtlRender(ui, { wrapper: Router });
};


// TODO: Write up a real test for this util or find the real way to have a util file
// This might be the answer https://testing-library.com/docs/react-testing-library/setup/
test('I dont know how to test this', () => {
  expect(2+2).toEqual(4)
});