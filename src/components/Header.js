// Header.js
import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header
      style={{
        position: 'sticky', // This makes the header sticky
        top: 0, // Sticks to the top
        zIndex: 100, // Ensure the header is above other content
        width: '100%', // Ensure it stretches across the page
      }}
    >
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          Profile
        </Menu.Item>
        <Menu.Item key="3" icon={<InfoCircleOutlined />}>
          About
        </Menu.Item>
        <Menu.Item key="4" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="5" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="6" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderComponent;
