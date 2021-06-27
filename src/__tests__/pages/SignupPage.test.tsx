import React from 'react';
import { render, screen } from '@testing-library/react';
import SignupPage from '../../pages/SignupPage';

test('SignupPage renders correctly', () => {
  render(<SignupPage />);
  const divElement = screen.getByText('SignupPage');
  expect(divElement).toBeInTheDocument();
});
