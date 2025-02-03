// CardComponent.js
import React, { useEffect } from "react";
import "../App.css"; // Import the CSS file
import { Row, Col } from "antd";
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
import FailureCard from "../sections/FailureCard";
import DashboardEngineClassesCard from "../sections/DashboardEngineClassesCard";
import Loader from "../components/Loader";

const NewCardComponent = () => {
  return (
    <div style={{ padding: 20, background: "#fff", borderRadius: 8, textAlign: "center" }}>
      <h3>T1</h3>
      <p>T2</p>
    </div>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, token } = useSelector((state) => state.auth);
  const API_URL = "http://13.61.26.58:5000";

  const fetchEngines = async () => {
    try {
      const engineRes = await axios.get(`${API_URL}/api/engines`, {
        headers: { Authorization: token },
      });
      const classEnginesData = await axios.get(`${API_URL}/api/classEngines`, {
        headers: { Authorization: token },
      });
      dispatch(enginesClasses(classEnginesData.data));
      dispatch(engines(engineRes.data));
    } catch (error) {
      console.error("Error fetching engines:", error.message);
    }
  };

  const fetchFailures = async () => {
    try {
      const failuresData = await axios.get(`${API_URL}/api/failures`, {
        headers: { Authorization: token },
      });
      dispatch(failures(failuresData.data));
    } catch (error) {
      console.error("Error fetching failures:", error.message);
    }
  };

  const fetchEngineFailures = async () => {
    try {
      const efData = await axios.get(`${API_URL}/api/engineFailures`, {
        headers: { Authorization: token },
      });
      dispatch(engineFailures(efData.data));
      dispatch(pendingEngineFailures(efData.data.filter((s) => s.status === "pending")));
      dispatch(inProgressEngineFailures(efData.data.filter((s) => s.status === "inProgress")));
      dispatch(completedEngineFailures(efData.data.filter((s) => s.status === "completed")));
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
  }, [dispatch]);

  return (
    <div>
      {!loading ? (
        <div style={{ minHeight: 360, zIndex: 2, position: "relative" }}>
          <Row gutter={25} style={{ marginBottom: 15 }}>
            <Col span={8}><DashboardEngineClassesCard /></Col>
            <Col span={8}><DashboardEngineCard /></Col>
            <Col span={8}><FailureCard /></Col>
          
          </Row>
      
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Dashboard;
