import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  BarChartOutlined,
  SettingOutlined,
  AlertFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { HomeOutlined, RailwayAlertOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedKey } from "../redux/authSlice";

const { Header } = Layout;

const Navbar = () => {
  const dispatch = useDispatch();
  const handleMenuClick = (e) => {
    dispatch(setSelectedKey(e.key));
  };
  const { selectedKey } = useSelector((state) => state.auth);

  return (
    <Header style={{ background: "#001529", padding: 0 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        {/* Logo */}
        <div style={{ color: "#fff", fontSize: "25px", fontWeight: "bold" }}>
          CGR
        </div>

        {/* Navigation Menu */}
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ flex: 1, marginLeft: "20px" , fontSize: "15px" ,  fontWeight: "bold" }}
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/dashboard">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<RailwayAlertOutlined />}>
            <Link to="/enginesclasses">Engines Classes</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            <Link to="/engines">Engines</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<HomeOutlined />}>
            <Link to="/failures">Failures</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<AlertFilled />}>
            <Link to="/alerts">Alerts</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/services">Train Service</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<SettingOutlined />}>
            <Link to="/settings">Settings</Link>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default Navbar;
