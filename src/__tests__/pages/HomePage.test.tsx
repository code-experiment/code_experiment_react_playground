import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../../pages/HomePage';

test('HomePage renders correctly', () => {
  render(<HomePage />);
  const divElement = screen.getByText('Home');
  expect(divElement).toBeInTheDocument();
});
