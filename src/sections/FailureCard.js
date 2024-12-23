// CardComponent.js
import React, { useEffect, useState } from "react";
import "../App.css"; // Import the CSS file
import CardComponent from "../components/CardComponet";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const FailureCard = () => {
  const { engineData } = useSelector((state) => state.eng);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/failures");
  };

  return (
    <div>
      <CardComponent
        onCardClick={handleLogin}
        title={"Failures"}
      ></CardComponent>
    </div>
  );
};

export default FailureCard;
