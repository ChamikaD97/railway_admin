import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout"; // Import MainLayout component
import { Modal } from "antd";
import LoginForm from "./pages/LoginForm";
import RegistrationForm from "./pages/RegistrationForm";
import Dashboard from "./pages/Dashboard";
import Engines from "./pages/Engines";
import Failures from "./pages/Failures";
import EngineClasses from "./pages/Engine Classes";
import Trips from "./pages/Trips";
import Users from "./pages/Users";
import SelectedUser from "./pages/SelectedUser";
import SelectedEngine from "./pages/SelectedEngine";
import SingleTrip from "./pages/SingleTrip";

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/engines" element={<Engines />} />
          <Route path="/enginesclasses" element={<EngineClasses />} />
          <Route path="/failures" element={<Failures />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/engine/:subClass" element={<SelectedEngine />} />
          <Route path="/user/:comNum" element={<SelectedUser />} />
           <Route path="/trip/:Id" element={<SingleTrip />} />

          
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
      </MainLayout>
    </Router>
  );
};

export default App;
