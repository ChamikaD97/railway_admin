// CardComponent.js
import React, { useEffect, useState } from "react";
import "../App.css"; // Import the CSS file
import CardComponent from "../components/CardComponet";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedKey } from "../redux/authSlice";
const DashboardEngineClassesCard = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(setSelectedKey("3"));
    navigate("/enginesclasses");
  };
  return (
    <div>
      <CardComponent onCardClick={handleOnClick} title={"Engines Classes"} />
    </div>
  );
};

export default DashboardEngineClassesCard;
