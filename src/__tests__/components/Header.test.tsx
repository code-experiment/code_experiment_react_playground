import React from "react";
import { render, screen } from "../../utils/test-utils";
import Header from "../../components/Header";

describe("Header", () => {
  test("Root route renders correct elements", () => {
    render(<Header />, { route: "/" });
    expect(screen.getByText("Todo List")).toBeInTheDocument();
  });

  test("/add-todo route renders correct elements", () => {
    render(<Header />, { route: "/add-todo" });
    expect(screen.getByText("Add Todo")).toBeInTheDocument();
    expect(screen.getByRole("link")).toBeInTheDocument();
  });
});
