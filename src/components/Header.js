import React from "react";
import { Layout, Menu, Button } from "antd";
import {
  HomeSharp,
  TrainRounded,
  TrainSharp,
  Warning,
  Notifications,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, setSelectedKey, userToken } from "../redux/authSlice"; // Adjust path if needed

const { Header } = Layout;

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { selectedKey } = useSelector((state) => state.auth);
  const location = useLocation();

  // Sync menu selection with the current route on mount
  React.useEffect(() => {
    const pathToKey = {
      "/dashboard": "1",
      "/engines": "2",
      "/enginesclasses": "3",
      "/failures": "4",
      "/notifications": "5",
    };
    dispatch(setSelectedKey(pathToKey[location.pathname] || "0"));
  }, [location.pathname, dispatch]);

  // Handle logout
  const handleLogout = () => {
    dispatch(login());
    dispatch(userToken());
    dispatch(setSelectedKey("0")); // Reset selected key or perform any other logout actions
    navigate("/"); // Redirect to login page
  
    
  };

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
      }}
    >
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        onClick={(e) => dispatch(setSelectedKey(e.key))}
        style={{ lineHeight: "64px" }} // Aligning items vertically
      >
        <Menu.Item key="1" icon={<HomeSharp />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<TrainRounded />}>
          <Link to="/engines">Engines</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<TrainSharp />}>
          <Link to="/enginesclasses">Engine Classes</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<Warning fontSize="35" />}>
          <Link to="/failures">Failures</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<Notifications />}>
          <Link to="/notifications">Notifications</Link>
        </Menu.Item>
        
        {/* Logout Menu Item - Floating to the right */}
        <Menu.Item
          key="6"
          icon={<Notifications />}
          onClick={handleLogout}
          style={{
            position: "absolute",
            right: 0, // Float it to the right
            top: "50%", // Vertically center it
            transform: "translateY(-50%)", // Adjust for perfect centering
          }}
        >
          Logout
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderComponent;
