import React, { useState } from 'react';
import { useAuthSKR } from './AuthContextSKR'; // Importing the custom hook for authentication.
import { useNavigate } from 'react-router-dom'; // Hook for navigating programmatically.
import { Input, Button } from 'antd'; // Importing UI components from Ant Design.
import { UserOutlined, LockOutlined } from '@ant-design/icons'; // Importing icons for the UI.

// Define the LoginSKR functional component.
function LoginSKR() {
  // Destructure the loginSKR function from the useAuthSKR hook for authentication.
  const { loginSKR } = useAuthSKR();
  // State for handling username input, initialized with 'AdminSKR'.
  const [usernameSKR, setUsernameSKR] = useState('AdminSKR');
  // State for handling password input, initialized with '123'.
  const [passwordSKR, setPasswordSKR] = useState('123');
  // Hook to navigate to different routes programmatically.
  const navigate = useNavigate();

  // Function to handle login when the login button is clicked.
  const handleLoginSKR = () => {
    // Check if username and password are not empty.
    if (usernameSKR && passwordSKR) {
      loginSKR(); // Call the login function from the auth context.
      navigate('/recipeSKR'); // Navigate to the recipeSKR page after successful login.
    } else {
      // Alert the user to enter credentials if either field is empty.
      alert('Please enter your username and password.');
    }
  };

  // JSX to render the login form.
  return (
    <section className="vh-100 ant-custom-container">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              {/* Username input field with Ant Design Input component and an icon */}
              <div className="form-outline mb-4 ant-form-item">
                <Input
                  type="text"
                  id="usernameSKR"
                  placeholder="Enter your username"
                  value={usernameSKR}
                  onChange={(e) => setUsernameSKR(e.target.value)}
                  addonBefore={<UserOutlined className="site-form-item-icon" />}
                />
              </div>

              {/* Password input field with Ant Design Input component and an icon */}
              <div className="form-outline mb-3 ant-form-item">
                <Input
                  type="password"
                  id="passwordSKR"
                  placeholder="Enter password"
                  value={passwordSKR}
                  onChange={(e) => setPasswordSKR(e.target.value)}
                  addonBefore={<LockOutlined className="site-form-item-icon" />}
                />
              </div>

              {/* Login button */}
              <div className="text-center text-lg-start mt-4 pt-2">
                <Button
                  type="button"
                  id="login-button"
                  className="btn btn-primary btn-lg ant-btn ant-btn-lg"
                  onClick={handleLoginSKR}
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// Export the LoginSKR component for use in other parts of the application.
export default LoginSKR;
