import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthForm from '../../components/AuthForm';

test('renders Auth Form Text', () => {
  render(<AuthForm />);
  const divElement = screen.getByText('AuthForm');
  expect(divElement).toBeInTheDocument();
});
