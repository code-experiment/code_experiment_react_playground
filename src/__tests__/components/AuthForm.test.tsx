import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthForm from '../../components/AuthForm';

test('AuthForm renders correctly', () => {
  render(<AuthForm />);
  const divElement = screen.getByText('AuthForm');
  expect(divElement).toBeInTheDocument();
});
