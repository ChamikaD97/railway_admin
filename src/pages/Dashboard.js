// CardComponent.js
import React, { useEffect, useState } from "react";

import "../App.css"; // Import the CSS file
import { Row, Col, Modal, Badge } from "antd";
import DashboardEngineCard from "../sections/DashboardEngineCard";
import { isLoading } from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { engines, enginesClasses, setSearch } from "../redux/engineSlice";
import {
  failures,
  engineFailures,
  pendingEngineFailures,
  completedEngineFailures,
  inProgressEngineFailures,
} from "../redux/failureSlice";

import { useNavigate } from "react-router-dom";
import FailureCard from "../sections/FailureCard";
import DashboardEngineClassesCard from "../sections/DashboardEngineClassesCard";
import Loader from "../components/Loader";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const API_URL = "http://13.61.26.58:5000";
  const { selectedKey } = useSelector((state) => state.auth);
  const fetchEngines = async () => {
    try {
      // const token = await AsyncStorage.getItem("token");
      // if (!token) return     navigate('/dashboard');

      const engineRes = await axios.get(`${API_URL}/api/engines`, {
        headers: { Authorization: token },
      });

      const classEnginesData = await axios.get(`${API_URL}/api/classEngines`, {
        headers: {
          Authorization: token, // Include token if required
        },
      });
      dispatch(enginesClasses(classEnginesData.data));
      dispatch(engines(engineRes.data));
    } catch (error) {
      console.error("Error fetching engines:", error.message);
    }
  };
  const fetchFailures = async () => {
    try {
      const failures = await axios.get(`${API_URL}/api/failures`, {
        headers: { Authorization: token },
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
      // const id = await AsyncStorage.getItem("failureId");
      // const response = await axios.get(
      //   `${API_URL}/api/engineFailures/engineFailureById`,
      //   {
      //     // headers: { Authorization: token },
      //     params: { id },
      //   }
      // );
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
        headers: { Authorization: token },
      });

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
    dispatch(setSearch());
    dispatch(isLoading(true));
    fetchEngines();
    fetchFailures();
    fetchEngineFailures();
    setTimeout(() => {
      dispatch(isLoading(false));
    }, 500);
  }, []);

  return (
    <div>
      {!loading ? (
        <div style={{ minHeight: 360, zIndex: 2, position: "relative" }}>
          <Row gutter={25} style={{ marginBottom: 15 }}>
            <Col span={8}>
              <div>
                <DashboardEngineClassesCard />
              </div>
            </Col>
            <Col span={8}>
              <div>
                <DashboardEngineCard />
              </div>
            </Col>
            <Col span={8}>
              <div>
                <FailureCard />
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Dashboard;
