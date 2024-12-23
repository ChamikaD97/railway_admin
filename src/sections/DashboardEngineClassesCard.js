// CardComponent.js
import React, { useEffect, useState } from "react";
import "../App.css"; // Import the CSS file
import CardComponent from "../components/CardComponet";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const DashboardEngineClassesCard = () => {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/enginesclasses");
  };

  return (
    <div>
      <CardComponent onCardClick={handleLogin} title={"Engines Classes"}/>
    </div>
  );
};

export default DashboardEngineClassesCard;
