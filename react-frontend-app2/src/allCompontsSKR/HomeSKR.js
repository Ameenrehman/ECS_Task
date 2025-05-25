import React from 'react';
import { Link } from 'react-router-dom'; // Import for routing
import { Typography, List } from 'antd'; // Typography and List components from Ant Design
import '../App.css'; // Import for custom styles

const { Title, Paragraph } = Typography; // Destructure Typography components

const HomeSKR = () => {
  const theme = 'dark'; // Variable for theme, not currently used

  return (
    <div data-testid="home-component">
      {/* Header section */}
      <div style={{ backgroundColor: '#1890ff', padding: '20px 0' }}>
        <Title style={{ color: 'white', textAlign: 'center' }}>Welcome to the Recepie Radar!</Title>
      </div>

      {/* Main content section */}
      <div className="container"> {/* Container div for styling */}
        <div className="overlay"> {/* Overlay div for styling */}
          <div className="text"> {/* Text div for styling */}
            <Typography> {/* Typography component for structured text */}

              {/* Introduction paragraph */}
              <Paragraph className="paragraph">
                Recipe Radar is an innovative culinary application designed to revolutionize the way users discover and explore recipes.
                Unlike traditional recipe platforms, Recipe Radar employs advanced AI algorithms to curate personalized recipe recommendations based on individual preferences, dietary restrictions, and cooking habits.
              </Paragraph>

              {/* List of key features */}
              <Title level={2}>Key Features:</Title>
              <List
                bordered
                dataSource={[
                  'Personalized Recommendations',
                  'Smart Search Functionality',
                  'Dietary and Allergen Filters',
                  'Interactive Cooking Experience',
                ]}
                renderItem={item => <List.Item className="list">{item}</List.Item>} // Render each feature as a list item
              />

              {/* Explore now section */}
              <Title level={2}>Explore Now:</Title>
              <Paragraph className="paragraph">
                Get started by exploring our features
              </Paragraph>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSKR;
