import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For SPA-friendly navigation links
import { Menu, Dropdown, Switch } from 'antd'; // Ant Design components
import { useAuthSKR } from './AuthContextSKR'; // Custom hook for accessing authentication context
import { useNavigate } from 'react-router-dom'; // Hook for programmatically navigating
import {
  HomeOutlined, // Icons for menu items
  InfoCircleOutlined,
  ContactsOutlined,
  LoginOutlined,
  CoffeeOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

// Defines the HeaderSKR component
const HeaderSKR = () => {
  // Destructures isAuthenticatedSKR and logoutSKR from the authentication context
  const { isAuthenticatedSKR, logoutSKR } = useAuthSKR();
  const navigateSKR = useNavigate(); // Hook for navigation

  // Logout handler
  const handleLogoutSKR = () => {
    logoutSKR(); // Calls the logout function from context
    navigateSKR('/'); // Redirects to home page after logout
  };

  // Style object for customizing the menu and links
  const menuStyleSKR = {
    borderBottom: 'none', // Removes the bottom border from the menu
    link: {
      textDecoration: 'none', // Styles for links
    },
  };

  return (
    <div data-testid="header-component" >
      {/* Main menu */}
      <Menu  mode="horizontal" style={menuStyleSKR}>
        {/* Site title or logo */}
        <Menu.Item style={{ marginRight: 'auto' }}>
          <Link to="/" style={menuStyleSKR.link}>
            <span>
              <strong>Recepie Radar</strong> {/* Application name */}
            </span>
          </Link>
        </Menu.Item>

        {/* Displays menu items based on the authentication status */}
        {isAuthenticatedSKR ? (
          <>
            {/* Menu items for authenticated users */}
            <Menu.Item>
              <Link to="/" style={menuStyleSKR.link}>
                <HomeOutlined />
                Home
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/recipeSKR" style={menuStyleSKR.link}>
                <CoffeeOutlined />
                Explore Recepie
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/aboutusSKR" style={menuStyleSKR.link}>
                <InfoCircleOutlined />
                About Us
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/ContactUsSKR" style={menuStyleSKR.link}>
                <ContactsOutlined />
                Contact Us
              </Link>
            </Menu.Item>
            {/* Logout action */}
            <Menu.Item onClick={handleLogoutSKR}>
              <LogoutOutlined />
              Logout
            </Menu.Item>

          </>
        ) : (
          <>
            {/* Menu items for unauthenticated users */}
            <Menu.Item>
              <Link to="/" style={menuStyleSKR.link}>
                <HomeOutlined />
                Home
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link to="/aboutusSKR" style={menuStyleSKR.link}>
                <InfoCircleOutlined />
                About Us
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/ContactUsSKR" style={menuStyleSKR.link}>
                <ContactsOutlined />
                Contact Us
              </Link>
            </Menu.Item>
            {/* Login navigation */}
            <Menu.Item>
              <Link to="/loginSKR" style={menuStyleSKR.link}>
                <LoginOutlined />
                Login
              </Link>
            </Menu.Item>
           
          </>
        )}
      </Menu>
    </div>
  );
};

export default HeaderSKR;
