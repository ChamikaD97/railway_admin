// CardComponent.js
import React, { useEffect, useState } from "react";
import "../App.css"; // Import the CSS file
import CardComponent from "../components/CardComponet";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedKey } from "../redux/authSlice";
import axios from "axios";

const DashboardEngineClassesCard = () => {
  const navigate = useNavigate();
  const API_URL = "http://13.61.26.58:5000";

  const dispatch = useDispatch();
  const [enginesClassesCount, setClassEngines] = useState(0);
  const handleOnClick = () => {
    dispatch(setSelectedKey("3"));
    navigate("/enginesclasses");
  };

  const fetchEngines = async () => {
    try {
      const classEnginesData = await axios.get(
        `${API_URL}/api/classEngines`,
        {
          headers: { Authorization: "token" },
        }
      );

      setClassEngines(classEnginesData.data.length);
    } catch (error) {
      console.error("Error fetching engines:", error.message);
    }
  };
  useEffect(() => {
    fetchEngines();
  }, []);

  return (
    <div>
      <CardComponent
        val={enginesClassesCount}
        onCardClick={handleOnClick}
        title={"Engines Classes"}
      />
    </div>
  );
};

export default DashboardEngineClassesCard;
