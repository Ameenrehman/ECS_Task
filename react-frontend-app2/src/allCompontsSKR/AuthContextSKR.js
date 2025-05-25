// Import necessary React hooks and createContext function for context API.
import React, { createContext, useContext, useState } from 'react';

// Create a context for authentication state.
const AuthContext = createContext();

// Custom hook to use the authentication context.
// This hook simplifies the process of accessing the auth context throughout the application.
export function useAuthSKR() {
  // useContext hook will make the context data available to any component that calls this hook.
  return useContext(AuthContext);
}

// Component that provides authentication state to its children.
export function AuthProviderSKR({ children }) {
  // State hook to keep track of the authentication status.
  // Initially, the user is not authenticated.
  const [isAuthenticatedSKR, setIsAuthenticatedSKR] = useState(false);

  // Function to update the state to authenticated.
  const loginSKR = () => {
    setIsAuthenticatedSKR(true);
  };

  // Function to update the state to not authenticated.
  const logoutSKR = () => {
    setIsAuthenticatedSKR(false);
  };

  // The value object includes the authentication state and the functions to modify it.
  // This value will be available to any descendent components of AuthProviderSKR.
  const value = {
    isAuthenticatedSKR,
    loginSKR,
    logoutSKR,
  };

  // The AuthContext.Provider component makes the authentication state and helper functions
  // accessible to any child component. This is where the context value is passed down.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
