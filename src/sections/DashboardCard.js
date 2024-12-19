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

  return (
    <div>
      <CardComponent
        title={""}
        imageUrl="https://via.placeholder.com/240"
        buttonText="Click Me"
      />
    </div>
  );
};

export default DashboardEngineCard;
