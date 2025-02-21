import React, { useState, useEffect } from "react";
import { Table, Modal, Input, Card, Tag } from "antd";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs"; // Import dayjs

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { isLoading } from "../redux/authSlice";
import {
  ReloadOutlined,
  DownloadOutlined,
  PlusCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons"; // Import the icon

const Trips = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [tripCardData, setTripCardData] = useState([]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [name, setName] = useState("TRIPS");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const API_URL = "http://13.61.26.58:5000";
  const fetchTripCards = async () => {
    try {
      // const token = await AsyncStorage.getItem("token");
      // if (!token) return navigation.navigate("Login");
      dispatch(isLoading(true));
      const trips = await axios.get(`${API_URL}/api/tripCards`, {
        headers: { Authorization: "token" },
      });
      setTripCardData(trips.data);
      setFilteredData(trips.data);

      setTimeout(() => {
        dispatch(isLoading(false));
      }, 500);
    } catch (error) {
      console.error("Error fetching trip Cards:", error.message);
    }
    dispatch(isLoading(false));
  };
  useEffect(() => {
    fetchTripCards();
  }, []);
  const formatDate = (date) => {
    if (date) {
      return dayjs(date).format("DD/MM/YYYY"); // Format date as needed (e.g., 'DD/MM/YYYY')
    }
  };
  const getDateDifference = (reportedDate, completedDate) => {
    if (reportedDate && completedDate) {
      const diffInDays = dayjs(completedDate).diff(dayjs(reportedDate), "day");
      return diffInDays; // Returns the difference in days
    }
    return 0;
  };
  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => formatDate(date),
    },
    {
      title: "Driver Computer Number",
      dataIndex: "driverComNum",
      key: "driverComNum",
    },
    {
      title: "Engine",
      dataIndex: "engine",
      key: "engine",
    },
    {
      title: "Train Number",
      dataIndex: "trainNumber",
      key: "trainNumber",
    },

    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
    },

    {
      title: "Assistance Name",
      dataIndex: "assistanceName",
      key: "assistanceName",
    },
  ];

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    if (!value) {
      setFilteredData(tripCardData);
      return;
    }
    const filtered = filteredData.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleRowClick = (record) => {
    navigate(`/trip/${record._id}`);

  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedRow(null);
  };

  return (
    <div>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            paddingBottom: "3px",
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
              text="Refresh"
              icon={<ReloadOutlined />}
              onClick={fetchTripCards}
              type="rgba(145, 0, 0, 0.78)"
            />
          </div>

          <h2
            style={{ margin: 0 }}
            onClick={() => setFilteredData(filteredData)}
          >
            {name}
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Input
              placeholder="Search..."
              onChange={handleSearch}
              style={{ width: "300px", height: "40px", borderRadius: "15px" }}
            />
            <CustomButton text="Downlaod" type="rgba(0, 15, 145, 0.79)" />
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
            rowKey="_id"
            dataSource={filteredData}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            pagination={true} // Enable pagination
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
              <strong>Date:</strong> {selectedRow.createdAt || "N/A"}
            </p>
            <p>
              <strong>Engine:</strong> {selectedRow.engine || "N/A"}
            </p>
            <p>
              <strong>Driver:</strong> {selectedRow.driverComNum || "N/A"}
            </p>

            <p>
              <strong>Train Number :</strong> {selectedRow.trainNumber || "N/A"}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Trips;
