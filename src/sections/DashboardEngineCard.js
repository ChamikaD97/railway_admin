// CardComponent.js
import React, { useEffect, useState } from "react";
import "../App.css"; // Import the CSS file
import CardComponent from "../components/CardComponet";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedKey } from "../redux/authSlice";
const DashboardEngineCard = () => {
  const { engineData } = useSelector((state) => state.eng);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(setSelectedKey("2"));

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
