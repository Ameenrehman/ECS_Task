import { render, screen } from '@testing-library/react';
import App from './App';

// Test to ensure that the Home component is rendered for the default path
test('renders Home component for default path', () => {
  render(<App />); // Render the entire application
  const homeElement = screen.getByTestId('home-component'); // Find the Home component by its test ID
  expect(homeElement).toBeInTheDocument(); // Assert that the Home component is present in the document
});
