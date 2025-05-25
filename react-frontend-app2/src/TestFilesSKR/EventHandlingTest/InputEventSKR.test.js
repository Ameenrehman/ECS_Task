import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react'; // Import render, screen, and fireEvent functions for testing
import ContactUsSKR from '../../allComponentsSKR/ContactUsSKR'; // Import the ContactUsSKR component for testing

// Test scenario: Test the onChange event when changing the input value
test('onchange user name on input testing', () => {
  // Render the ContactUsSKR component
  render(<ContactUsSKR/>);
  
  // Find the input element by its label
  const input = screen.getByLabelText('Your name'); // Get the input by its label text
  fireEvent.change(input, { target: { value: 'a' } }); // Simulate a change event with the input value 'a'
  
  // Check if the input value is updated correctly
  expect(input.value).toBe('a'); // Assert that the input value matches the expected value 'a'
});
