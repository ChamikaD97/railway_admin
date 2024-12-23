import React, { useEffect, useState } from "react";
import { Table, Modal, Input, Card } from "antd";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { engines, enginesClasses, setSearch } from "../redux/engineSlice";
import { isLoading } from "../redux/authSlice";
import ReactCountryFlag from "react-country-flag";

const Engines = () => {
  const API_URL = "http://192.168.1.233:5000";
  const { engineData, search } = useSelector((state) => state.eng);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState(engineData);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filteredData, setFilteredData] = useState(engineData);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Sub Class",
      dataIndex: "subClass",
      key: "subClass",
    },
    {
      title: "Power(Hp)",
      dataIndex: "power(Hp)",
      key: "power(Hp)",
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
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
  ];

  const handleRowClick = (record) => {
    setSelectedRow(record);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedRow(null);
  };

  // const handleSearch = (event) => {
  //   const value = event.target.value.toLowerCase();
  //   if (!value) {
  //     setFilteredData(engineData);
  //     return;
  //   }
  //   console.log(value);

  //   const filtered = tableData.filter(
  //     (item) =>
  //       item.class?.toLowerCase().includes(value) ||
  //       item.subClass?.toLowerCase().includes(value)
  //   );
  //   setFilteredData(filtered);
  // };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    if (!value) {
      return;
    }
    const filtered = engineData.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };


  const fetchEngines = async () => {
    dispatch(setSearch());

    try {
      // const token = await AsyncStorage.getItem("token");
      // if (!token) return     navigate('/dashboard');
      dispatch(isLoading(true));
      const engineRes = await axios.get(`${API_URL}/api/engines`, {
        headers: { Authorization: "token" },
      });

      dispatch(engines(engineRes.data));
      setFilteredData(engineData);

      setTimeout(() => {
        dispatch(isLoading(false));
      }, 500);
    } catch (error) {
      console.error("Error fetching engines:", error.message);
    }
  };

  useEffect(() => {
    if (!search) {
      setFilteredData(engineData);
      return;
    }

    const filtered = engineData.filter((item) =>
      item.class?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredData(filtered);
  }, []);
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
              text="Home"
              onClick={() => navigate("/dashboard")}
              type="rgba(0, 145, 102, 0.78)"
            />
            <CustomButton
              text="Refresh"
              onClick={fetchEngines}
              type="rgba(145, 0, 0, 0.78)"
            />
          </div>
          <h2 style={{ margin: 0 }} onClick={() => setFilteredData(engineData)}>
            Engine Details
          </h2>

          <Input
            placeholder="Search..."
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
      <Modal
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
        centered
        bodyStyle={{ padding: "20px", fontSize: "16px" }}
      >
        {selectedRow && (
          <div>
            <p>
              <strong>Class:</strong> {selectedRow.class || "N/A"}
            </p>
            <p>
              <strong>Sub Class:</strong> {selectedRow.subClass || "N/A"}
            </p>
            <p>
              <strong>Power (Hp):</strong> {selectedRow["power(Hp)"] || "N/A"}
            </p>
            <p>
              <strong>Axle Structure:</strong>{" "}
              {selectedRow.axleStructure || "N/A"}
            </p>
            <p>
              <strong>Power Engine:</strong> {selectedRow.powerEngine || "N/A"}
            </p>
            <p>
              <strong>Year:</strong> {selectedRow.year || "N/A"}
            </p>
            <p>
              <div></div>
              <strong>Country: </strong>
              <ReactCountryFlag
                svg
                style={{
                  width: "8em",
                  height: "5em",
                }}
                countryCode={selectedRow.country}
              />
            </p>
            <p>
              <strong>Company:</strong> {selectedRow.company || "N/A"}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Engines;
