// CardComponent.js
import React, { useEffect, useState } from "react";
import "../App.css"; // Import the CSS file
import CardComponent from "../components/CardComponet";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedKey } from "../redux/authSlice";
const FailureCard = () => {
  const { engineData } = useSelector((state) => state.eng);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnClick = () => {
       dispatch(setSelectedKey("4"));
    navigate("/failures");
  };

  return (
    <div>
      <CardComponent
        onCardClick={handleOnClick}
        title={"Failures"}
      ></CardComponent>
    </div>
  );
};

export default FailureCard;
