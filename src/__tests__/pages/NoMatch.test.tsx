import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from "../utils/utils";
import NoMatch from '../../pages/NoMatch';

test('NoMatch renders correctly', () => {
  renderWithRouter(<NoMatch />);
  
  const element = screen.getByText("Uh Oh.. This page doesn't exist");
  const link = screen.getByRole("link", { name: "Go back home" });

  expect(element).toBeInTheDocument();
  expect(link).toBeInTheDocument();
  expect(link.getAttribute('href')).toEqual('/')
});
