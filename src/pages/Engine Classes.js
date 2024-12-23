import React, { useState } from "react";
import { Table, Modal, Input, Card } from "antd";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { engines, enginesClasses, setSearch } from "../redux/engineSlice";
import { isLoading } from "../redux/authSlice";
import ReactCountryFlag from "react-country-flag";

const EngineClasses = () => {
  const API_URL = "http://192.168.1.233:5000";
  const { enginesClasses } = useSelector((state) => state.eng);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState(enginesClasses);
  const [filteredData, setFilteredData] = useState(enginesClasses);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Engine Class",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Number of Engines",
      dataIndex: "count",
      key: "count",
    },
  ];

  const handleRowClick = (record) => {
    dispatch(setSearch(record.className));
    navigate('/engines')
    
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    if (!value) {
      setFilteredData(enginesClasses);
      return;
    }
    const filtered = tableData.filter((item) =>
      item.className?.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

 const fetchEngines = async () => {
    try {
      // const token = await AsyncStorage.getItem("token");
      // if (!token) return     navigate('/dashboard');

      const engineRes = await axios.get(`${API_URL}/api/engines`, {
        headers: { Authorization: "token" },
      });
      const classCounts = engineRes.data.reduce((acc, item) => {
        acc[item.class] = (acc[item.class] || 0) + 1;
        return acc;
      }, {});
      const classCountsArray = Object.entries(classCounts).map(([className, count]) => ({
        className,
        count
      }));
      dispatch(enginesClasses(classCountsArray));
      dispatch(engines(engineRes.data));
    } catch (error) {
      console.error("Error fetching engines:", error.message);
    }
  };
  return (
    <div>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CustomButton
              text="Back to Dashboard"
              onClick={() => navigate("/dashboard")}
              type="rgba(0, 145, 102, 0.78)"
            />
            <CustomButton
              text="Refresh"
              onClick={fetchEngines}
              type="rgba(145, 0, 0, 0.78)"
            />
          </div>
          <h2
            style={{ margin: 0 }}
            onClick={() => setFilteredData(enginesClasses)}
          >
            Engine Classes
          </h2>

          <Input
            placeholder="Search by Class or Sub Class"
            onChange={handleSearch}
            style={{ width: "300px", height: "40px", borderRadius: "15px" }}
          />
        </div>
        <div
          style={{
            maxHeight: "calc(100vh - 200px)", // Adjust height to fit window
            overflowY: "auto", // Enable vertical scrolling for the table only
            borderRadius: "15px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            padding: "10px",
          }}
        >
          <Table
            columns={columns}
            dataSource={filteredData}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            pagination={true} // Disable pagination to show full data with scrolling
            scroll={{ x: true }}
            bordered
            loading={loading}
          />
        </div>
      </Card>
    </div>
  );
};

export default EngineClasses;
