// CardComponent.js
import React, { useEffect, useState } from "react";
import "../App.css"; // Import the CSS file
import CardComponent from "../components/CardComponet";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const DashboardEngineCard = () => {
  const { engineData } = useSelector((state) => state.eng);

  const navigate = useNavigate();
  console.log(engineData);

  const handleLogin = () => {
    navigate("/engines");
  };

  return (
    <div>
      <CardComponent onCardClick={handleLogin} title={"Engines"}>
        gajkadhsh
      </CardComponent>
    </div>
  );
};

export default DashboardEngineCard;
