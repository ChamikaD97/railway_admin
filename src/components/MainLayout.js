import React from "react";
import { Layout } from "antd";
import HeaderComponent from "./Header";
import background from "../images/background.jpg"; // Adjust the path accordingly
import backgroundN from "../images/1.jpg"; // Adjust the path accordingly
import { useLocation } from "react-router-dom"; // Import useLocation here

const { Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  const location = useLocation(); // Hook to get the current location
  const isLoginPage = location.pathname === "/"; // Check if the route is the login page

  return (
    <div>
      <Layout className="layout">
        {!isLoginPage && <HeaderComponent />}{" "}
        {/* Only show HeaderComponent if not on login page */}
        <div
          style={{
            height: "100vh", // Full viewport height
            backgroundImage: `url(${background})`,
            backgroundSize: "cover", // Ensures the image covers the entire div
            backgroundPosition: "center", // Centers the image
          }}
        >
          <Layout
            style={{
              padding: "0 50px",
              marginTop: 10,
              backgroundColor: "transparent",
            }}
          >
            <Content style={{ padding: "24px 0", minHeight: 280 }}>
              {children}
            </Content>
          </Layout>
        </div>
      </Layout>
     
    </div>
  );
};

export default MainLayout;
