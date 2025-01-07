// MainLayout.js
import React from "react";
import { Layout } from "antd";
import HeaderComponent from "./Header";
import background from "../images/background.jpg"; // Adjust the path accordingly
import backgroundN from "../images/111.jpg"; // Adjust the path accordingly
import Navbar from "./Navbar";

const { Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout className="layout">
     <Navbar/>
     
      <div
        style={{
          height: "100vh", // Full viewport height
          backgroundImage: `url(${backgroundN})`,
          backgroundSize: "cover", // Ensures the image covers the entire div
          backgroundPosition: "center", // Centers the image
        }}
      >
        <Layout style={{ padding: "0 30px", marginTop: 10, backgroundColor:'transparent' }}>
          <Content style={{ padding: "24px 0", minHeight: 280 }}>
            {children}
          </Content>
        </Layout>
      </div>

      
    </Layout>
  );
};

export default MainLayout;
