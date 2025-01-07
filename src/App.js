// App.js

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { Row, Col, Modal, Badge } from "antd";
import LoginForm from "./pages/LoginForm";
import RegistrationForm from "./pages/RegistrationForm";
import Dashboard from "./pages/Dashboard";
import Engines from "./pages/Engines";
import Failures from "./pages/Failures";
import EngineClasses from "./pages/Engine Classes";
import SingleEngine from "./pages/SingleEngine";
import Alerts from "./pages/Alerts";
import Services from "./pages/Services";
const App = () => {
  const [isHovering, setIsHovering] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  return (
    <Router>
      <MainLayout>
        <div style={{ position: "relative" }}>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/engines" element={<Engines />} />
            <Route path="/enginesclasses" element={<EngineClasses />} />
            <Route path="/failures" element={<Failures />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/services" element={<Services />} />
            <Route path="/engine/:subClass" element={<SingleEngine />} />
          </Routes>
          <Modal
            title={modalData.title}
            open={isModalVisible}
            footer={null}
            centered
            onCancel={() => setIsModalVisible(false)}
            mask={false} // Removes background darkening effect
            style={{ textAlign: "center" }}
          >
            <p>{modalData.description}</p>
          </Modal>
        </div>
      </MainLayout>
    </Router>
  );
};

export default App;
