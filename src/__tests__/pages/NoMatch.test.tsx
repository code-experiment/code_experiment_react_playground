import React from 'react';
import { render, screen } from '../../utils/test-utils';
import NoMatch from '../../pages/NoMatch';

test('NoMatch renders correctly', () => {
  render(<NoMatch />);
  
  const element = screen.getByText("Uh Oh.. This page doesn't exist");
  const link = screen.getByRole("link", { name: "Go back home" });

  expect(element).toBeInTheDocument();
  expect(link).toBeInTheDocument();
  expect(link.getAttribute('href')).toEqual('/')
});
