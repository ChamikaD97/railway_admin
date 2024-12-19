// CardComponent.js
import React, { useEffect, useState } from "react";

import "../App.css"; // Import the CSS file
import CardComponent from "../components/CardComponet";
import { Row, Col, Modal, Badge } from "antd";
import DashboardEngineCard from "../sections/DashboardCard";
import DashboardTrackCard from "../sections/DashboardTrackCard";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { engines } from "../redux/engineSlice";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const API_URL = "http://192.168.1.233:5000";
  const fetchEngines = async () => {
    try {
      console.log("ok");

      const token = await AsyncStorage.getItem("token");
      // if (!token) return     navigate('/dashboard');

      const engineRes = await axios.get(`${API_URL}/api/engines`, {
        headers: { Authorization: token },
      });

      dispatch(engines(engineRes.data));
    } catch (error) {
      console.error("Error fetching engines:", error.message);
    }
  };
  const fetchFailures = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      // if (!token) return navigation.navigate("Login");

      const failures = await axios.get(`${API_URL}/api/failures`, {
        headers: { Authorization: token },
      });
      dispatch(engines(failures.data));
    } catch (error) {
      console.error("Error fetching failures:", error.message);
    }
  };
  useEffect(() => {
    fetchEngines();
  }, []);

  return (
    <div>
      <div style={{ minHeight: 360, zIndex: 2, position: "relative" }}>
        <Row gutter={25} style={{ marginBottom: 15 }}>
          <Col span={8}>
            <div
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <DashboardEngineCard />
            </div>
          </Col>
          <Col span={8}>
            <div
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
             
            >
              <DashboardTrackCard />
            </div>
          </Col>
          <Col span={8}>
            <div
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <CardComponent
                title="New Track Caustions"
                description="This is a description of card 2."
                imageUrl="https://via.placeholder.com/240"
                buttonText="Click Me"
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
