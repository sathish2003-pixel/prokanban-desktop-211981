import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ProKanban application', () => {
  render(<App />);
  const logoElement = screen.getByText(/ProKanban/i);
  expect(logoElement).toBeInTheDocument();
});
