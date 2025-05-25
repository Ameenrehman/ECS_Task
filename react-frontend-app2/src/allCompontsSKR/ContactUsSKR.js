import React, { useState } from 'react';
import { Form, Input, Button, Typography, Row, Col } from 'antd';

const { Title } = Typography;

// Contact Page Component
const ContactPageSKR = () => {
  // State variables for form data and response message
  const [formData, setFormData] = useState('');
  const [serverResponse, setServerResponse] = useState('');

  // Handle form submission
  const handleFormSubmitSKR = () => {
    setServerResponse('Thank you for reaching out! We will get back to you shortly.');
    // Add logic here to handle form submission
  };

  return (
    <div>
      {/* Contact section */}
      <div className="about-section bg-primary">
        {/* Title */}
        <Title level={2} className="text-center font-weight-bold my-4">
          Get in Touch
        </Title>
        {/* Description */}
        <p className="text-center w-responsive mx-auto mb-5">
          Have any questions or queries? Don't hesitate to drop us a line. Our team is here to assist you.
        </p>
      </div>
      <br />
      {/* Contact Form */}
      <div className="row">
        <div className="col-md-9 mb-md-0 mb-5">
          {/* Form */}
          <Form id="contact-form" name="contact-form" action="mail.php" method="POST">
            <div className="row">
              <div className="col-md-6">
                {/* Name Input */}
                <Form.Item label="Your name" htmlFor="name">
                  <Input
                    id="name"
                    value={formData}
                    onChange={(e) => setFormData(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="col-md-6">
                {/* Email Input */}
                <Form.Item label="Your email" htmlFor="email">
                  <Input id="email" />
                </Form.Item>
              </div>
            </div>
            {/* Subject Input */}
            <div className="row">
              <div className="col-md-12">
                <Form.Item label="Subject" htmlFor="subject">
                  <Input id="subject" />
                </Form.Item>
              </div>
            </div>
            {/* Message Input */}
            <div className="row">
              <div className="col-md-12">
                <Form.Item label="Your message" htmlFor="message">
                  <Input.TextArea id="message" rows={2} />
                </Form.Item>
              </div>
            </div>
            {/* Submit Button */}
            <Row justify="center">
              <Col>
                <Button type="primary" onClick={handleFormSubmitSKR}>
                  Send
                </Button>
              </Col>
            </Row>
            <div className="status"></div>
          </Form>
        </div>
        {/* Contact Information */}
        <div className="col-md-3 text-center">
          <ul className="list-unstyled mb-0">
            <li>
              <i className="fas fa-map-marker-alt fa-2x"></i>
              <p>123 Main Street, City, Country</p>
            </li>
            <li>
              <i className="fas fa-phone mt-4 fa-2x"></i>
              <p>+ 01 234 567 89</p>
            </li>
            <li>
              <i className="fas fa-envelope mt-4 fa-2x"></i>
              <p>info@example.com</p>
            </li>
          </ul>
        </div>
      </div>
      {/* Server Response Message */}
      <h2 style={{ textAlign: 'center', color: 'green', marginTop: '20px' }}>{serverResponse}</h2>
    </div>
  );
};

export default ContactPageSKR;
