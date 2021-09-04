import { screen } from "@testing-library/react";
import renderWithRouter from "../../utils/test-utils";
import NoMatch from "../NoMatch";

test("NoMatch Page has the correct text", () => {
  renderWithRouter(<NoMatch />);

  const element = screen.getByText("No Match");

  expect(element).toBeInTheDocument();
});

test("NoMatch Page link has the correct href", () => {
  renderWithRouter(<NoMatch />, { route: "/aosijd" });

  const goBackHomeLink = screen.getByRole("link", { name: "Go Back Home" });

  expect(goBackHomeLink.getAttribute("href")).toBe("/");
});
