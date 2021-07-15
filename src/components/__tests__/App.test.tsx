import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from "../../utils/test-utils";
import App from '../App';

test('Make sure the Login button appears', () => {
  render(<App />);

  const loginButton = screen.getByRole('button', {name: 'Login'})

  expect(loginButton).toBeInTheDocument();
});

test('Make sure the Sign Up button appears', () => {
  render(<App />);

  const signUpButton = screen.getByRole('button', {name: 'Sign Up'})
  
  expect(signUpButton).toBeInTheDocument();
});

test('Make sure the Wave image appears', () => {
  render(<App />);

  const waveImage = screen.getByRole('img', {name: "wave"})
  
  expect(waveImage).toBeInTheDocument();
});

test('When I click the login button it takes me to the login page', () => {
  renderWithRouter(<App />);

  userEvent.click(screen.getByRole('button', {name: 'Login'}))
  
  expect(screen.getByText('login page')).toBeInTheDocument();
});

test('When I click the sign-up button it takes me to the sign-up page', () => {
  renderWithRouter(<App />);

  userEvent.click(screen.getByRole('button', {name: 'Sign Up'}))
  
  expect(screen.getByText('Sign Up Page')).toBeInTheDocument();
});