import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('Test App Component', () => {
  
  beforeEach(() => {
    render(<App />);
  });

  test('renders Vite + React heading', () => {
    const headingElement = screen.getByText(/Vite \+ React/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders initial count correctly', () => {
    const buttonElement = screen.getByText(/count is 0/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('increments count when button is clicked', () => {
    const buttonElement = screen.getByText(/count is 0/i);
    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveTextContent(/count is 1/i);
  });
});