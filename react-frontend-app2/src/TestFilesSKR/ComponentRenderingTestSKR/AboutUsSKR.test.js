import React from 'react';
import { render, screen } from '@testing-library/react'; // Import render and screen functions for testing
import AboutUsSKR from '../../allCompontsSKR/AboutUsSKR'; // Import the AboutUsSKR component for testing
import '@testing-library/jest-dom'; // Import Jest DOM for additional testing utilities

// Test scenario: Check if the AboutUsSKR component renders the correct heading
test('renders AboutUs component', () => {
  // Render the AboutUsSKR component
  render(<AboutUsSKR />);
  
  // Check if the heading "Our Dynamic Team" is rendered in the AboutUsSKR component
  const aboutHeading = screen.getByText('Our Dynamic Team'); // Get the element containing the specified text
  expect(aboutHeading).toBeInTheDocument(); // Assert that the element is present in the rendered output
});
