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
import {
  failures,
  engineFailures,
  pendingEngineFailures,
  completedEngineFailures,
  inProgressEngineFailures,
} from "../redux/failureSlice";
import { isLoading } from "../redux/authSlice";

import { useNavigate } from "react-router-dom";
import FailureCard from "../sections/FailureCard";
const Dashboard = () => {
  const [isHovering, setIsHovering] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const API_URL = "http://192.168.1.233:5000";
  const fetchEngines = async () => {
    try {
      // const token = await AsyncStorage.getItem("token");
      // if (!token) return     navigate('/dashboard');

      const engineRes = await axios.get(`${API_URL}/api/engines`, {
        headers: { Authorization: "token" },
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
        headers: { Authorization: "token" },
      });
      dispatch(failures(failures.data));
    } catch (error) {
      console.error("Error fetching failures:", error.message);
    }
  };
  const fetchEngineFailuresById = async () => {
    try {
      // const loggedUser = await AsyncStorage.getItem("user");
      // const u = JSON.parse(loggedUser);
      // const token = await AsyncStorage.getItem("token");
      // if (!token) return navigation.navigate("Login");

      const id = await AsyncStorage.getItem("failureId");
      const response = await axios.get(
        `${API_URL}/api/engineFailures/engineFailureById`,
        {
          // headers: { Authorization: token },
          params: { id },
        }
      );
    } catch (error) {
      console.error("Error fetching engineFailures:", error.message);
    } finally {
      dispatch(isLoading(false));
    }
  };

  const fetchEngineFailures = async () => {
    try {
      // const token = await AsyncStorage.getItem("token");
      // if (!token) return navigation.navigate("Login");

      const efDta = await axios.get(`${API_URL}/api/engineFailures`, {
        headers: { Authorization: "token" },
      });
      console.log(efDta.data);

      dispatch(engineFailures(efDta.data));
      dispatch(
        pendingEngineFailures(efDta.data.filter((s) => s.status == "pending"))
      );
      dispatch(
        inProgressEngineFailures(
          efDta.data.filter((s) => s.status == "inProgress")
        )
      );
      dispatch(
        completedEngineFailures(
          efDta.data.filter((s) => s.status == "completed")
        )
      );
    } catch (error) {
      console.error("Error fetching engineFailures:", error.message);
    }
  };
  useEffect(() => {
    fetchEngines();
    fetchFailures();
    fetchEngineFailures();
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
              <FailureCard />
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
