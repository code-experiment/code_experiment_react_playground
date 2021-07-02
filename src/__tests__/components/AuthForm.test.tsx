import React from 'react';
import { render, screen } from '../../utils/test-utils';
import AuthForm from '../../components/AuthForm';

test('AuthForm renders correctly', () => {
  render(<AuthForm />);
  const username = screen.getByText('Username');
  const password = screen.getByText('Password');
  expect(password).toBeInTheDocument();
  expect(username).toBeInTheDocument();
});
