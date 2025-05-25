import React from 'react';
import { render, screen } from '@testing-library/react'; // Import render and screen functions for testing
import App from '../../App'; // Import the main App component for testing
import '@testing-library/jest-dom/extend-expect'; // Extend Jest DOM for additional testing utilities

// Test scenario: Check if the Home component is rendered for the default path
test('renders Home component for default path', () => {
  // Render the main App component
  render(<App />);
  
  // Check if the element with the test ID "home-component" is rendered
  const homeElement = screen.getByTestId('home-component'); // Get the element with the specified test ID
  expect(homeElement).toBeInTheDocument(); // Assert that the element is present in the rendered output
});
