import React, { useState } from "react";
import { Table, Modal, Input, Card } from "antd";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { engines, enginesClasses, setSearch } from "../redux/engineSlice";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { setSelectedKey } from "../redux/authSlice";

const EngineClasses = () => {
  const API_URL = "http://13.61.26.58:5000";
  const { enginesClasses, search } = useSelector((state) => state.eng);
  const { loading, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState(enginesClasses);
  const [filteredData, setFilteredData] = useState(enginesClasses);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Engine Class",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Number of Engines",
      dataIndex: "num",
      key: "num",
    },
    {
      title: "Axle Structure",
      dataIndex: "axleStructure",
      key: "axleStructure",
    },
    {
      title: "Power Engine",
      dataIndex: "powerEngine",
      key: "powerEngine",
    },
  ];

  const handleRowClick = (record) => {
    console.log(record);
    
    dispatch(setSearch(record.class));
    navigate("/engines");
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    if (!value) {
      setFilteredData(enginesClasses);
      return;
    }
    // const filtered = tableData.filter((item) =>
    //   item.className?.toLowerCase().includes(value)
    // );
    const filtered = tableData.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const fetchEngines = async () => {
    try {
      const classEnginesData = await axios.get(`${API_URL}/api/classEngines`, {
        headers: {
          Authorization: token, // Include token if required
        },
      });
      dispatch(enginesClasses(classEnginesData.data));
    } catch (error) {
      console.error("Error fetching engines:", error.message);
    }
  };
  const exportToPDF = (data, columns, fileName) => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [columns],
      body: data.map((item) => columns.map((col) => item[col.key])),
    });
    doc.save(`${fileName}.pdf`);
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
              text={"Home"}
              onClick={() => {
                dispatch(setSelectedKey('1'));

                navigate("/dashboard");
              }}
              type="rgba(0, 145, 102, 0.78)"
            />
            <CustomButton
              text="Refresh"
              onClick={fetchEngines}
              type="rgba(145, 0, 0, 0.78)"
            />
            <CustomButton
              text="Engines"
              onClick={() => {
                dispatch(setSelectedKey('2'));

                navigate("/engines");
              }}
              type="rgba(0, 0, 0, 0.78)"
            />
          </div>
          <h2
            style={{ margin: 0 }}
            onClick={() => setFilteredData(enginesClasses)}
          >
            Engine Classes
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Input
              placeholder="Search by Class or Sub Class"
              onChange={handleSearch}
              style={{ width: "300px", height: "40px", borderRadius: "15px" }}
            />
            <CustomButton
              text="Downlaod"
              onClick={() => exportToPDF(filteredData, columns, "TableData")}
              type="rgba(0, 15, 145, 0.79)"
            />
          </div>
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
