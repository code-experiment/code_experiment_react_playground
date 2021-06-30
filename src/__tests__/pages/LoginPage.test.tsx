import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '../../pages/LoginPage';

test('LoginPage renders correctly', () => {
  render(<LoginPage />);
  const element = screen.getByText('Login');
  expect(element).toBeInTheDocument();
});
