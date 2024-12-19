// AppLayout.js
import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { Link } from 'react-router-dom'; // or you can use 'react-router-dom' for routing if needed

const { Header, Content, Footer } = AntLayout;

const AppLayout = ({ children }) => (
  <AntLayout style={{ minHeight: '100vh' }}>
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/about">About</Link>
        </Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding:'150px' }}>
      <div >
        {children}
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design Layout Example ©2024</Footer>
  </AntLayout>
);

export default AppLayout;
