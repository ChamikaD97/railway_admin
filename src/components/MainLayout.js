// MainLayout.js
import React from "react";
import { Layout } from "antd";
import HeaderComponent from "./Header";
import background from "../images/background.jpg"; // Adjust the path accordingly

const { Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout className="layout">
    
      <div
        style={{
          height: "100vh", // Full viewport height
          backgroundImage: `url(${background})`,
          backgroundSize: "cover", // Ensures the image covers the entire div
          backgroundPosition: "center", // Centers the image
        }}
      >
        <Layout style={{ padding: "0 50px", marginTop: 10, backgroundColor:'transparent' }}>
          <Content style={{ padding: "24px 0", minHeight: 280 }}>
            {children}
          </Content>
        </Layout>
      </div>

      
    </Layout>
  );
};

export default MainLayout;
