import React from 'react';
import { Typography, Row, Col, Card, Button, Space } from 'antd';


const { Title, Text } = Typography;

// Meet the Team page
const TeamPageSKR = () => {
  return (
    <div>
      
      <div style={{ backgroundColor: '#1890ff', padding: '20px 0' }}>
        {/* Company Introduction */}
        <Title style={{ color: 'white', textAlign: 'center' }}>Our Dynamic Team</Title>
        <Text style={{ color: 'white', textAlign: 'center', display: 'block' }}>
          Dive into the journey of our extraordinary team. Witness our synergy as you resize your browser window.
        </Text>
      </div>

      {/* Meet Our Dedicated Team */}
      <Title level={2} style={{ textAlign: 'center', marginTop: '20px' }}>Meet Our Stellar Squad</Title>

      {/* Team Members */}
      <Row gutter={[16, 16]} justify="center">
        <Col span={6}>
          <Card>
            <img
              src="/images/jane.jpg" // Update with your image path
              alt="Jane"
              style={{ width: '100%' }}
            />
            <div style={{ textAlign: 'center' }}>
              {/* Jane's Profile */}
              <Title level={4}>Jane Smith</Title>
              <Text strong>Chief Executive Officer (CEO)</Text><br/>
              <Text>Leading the helm with innovation and foresight.</Text><br/>
              <Text>jane@gmasil.com</Text><br/>
              <Space>
                <Button type="primary">Connect</Button>
              </Space>
            </div>
          </Card>
        </Col>

        {/* Mike's Profile */}
        <Col span={6}>
          <Card>
          <img
              src="/images/mike.jpg" // Update with your image path
              alt="Mike"
              style={{ width: '100%' }}
            />
            <div style={{ textAlign: 'center' }}>
              <Title level={4}>Mike Johnson</Title>
              <Text strong>Artistic Director (D)</Text><br/>
              <Text>Elevating visual storytelling and creativity.</Text><br/>
              <Text>mike@GMAIL.com</Text><br/>
              <Space>
                <Button type="primary">Connect</Button>
              </Space>
            </div>
          </Card>
        </Col>

        {/* John's Profile */}
        <Col span={6}>
          <Card>
          <img
              src="/images/john.jpg" // Update with your image path
              alt="John"
              style={{ width: '100%' }}
            />
            <div style={{ textAlign: 'center' }}>
              <Title level={4}>John Williams</Title>
              <Text strong>Design Maestro</Text><br/>
              <Text>Mastering the art of captivating designs.</Text><br/>
              <Text>john@GMAIL.com</Text><br/>
              <Space>
                <Button type="primary">Connect</Button>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TeamPageSKR;
