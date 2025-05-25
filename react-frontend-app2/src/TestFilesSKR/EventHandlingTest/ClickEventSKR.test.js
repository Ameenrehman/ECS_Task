import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react'; // Import render, screen, and fireEvent functions for testing
import ContactUsSKR from '../../allCompontsSKR/ContactUsSKR'; // Import the ContactUsSKR component for testing

// Test scenario: Test the onChange event when clicking the button
test('onchange user name on btn testing', () => {
  // Render the ContactUsSKR component
  render(<ContactUsSKR/>);
  
  // Find the button element
  const btn = screen.getByRole('button'); // Get the button by its role
  fireEvent.click(btn); // Simulate a click event on the button
  
  // Check if the expected response text is rendered after clicking the button
  expect(screen.getByText("Soon you will receive a response")).toBeInTheDocument(); // Assert that the response text is present in the rendered output
});
