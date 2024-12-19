import React, { useState } from "react";
import { Table, Modal, Input, Card } from "antd";
import { useSelector } from "react-redux";
import DashboardTrackCard from "../sections/DashboardTrackCard";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";

const Failures = () => {
  const { failures } = useSelector((state) => state.fail);

  const [tableData, setTableData] = useState(failures);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filteredData, setFilteredData] = useState(failures);
  const navigate = useNavigate();
  console.log(failures);
  
  const columns = [
    {
      title: "Engine",
      dataIndex: "engine",
      key: "engine",
    },
    {
      title: "Drivcer Computer Number",
      dataIndex: "drivcerComNum",
      key: "drivcerComNum",
    },
    {
      title: "Reported Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Failure",
      dataIndex: "failure",
      key: "failure",
    },
    {
      title: "Risk",
      dataIndex: "risk",
      key: "risk",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "LFC Computer Number",
      dataIndex: "LFCComNum",
      key: "LFCComNum",
    },
    {
      title: "Assinged LF",
      dataIndex: "assingedTo",
      key: "assingedTo",
    },
    {
      title: "Started Date",
      dataIndex: "startedOn",
      key: "startedOn",
    },
    {
      title: "Completed Date",
      dataIndex: "completedOn",
      key: "completedOn",
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

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    if (!value) {
      setFilteredData(failures);
      return;
    }
    const filtered = tableData.filter(
      (item) =>
        item.class?.toLowerCase().includes(value) ||
        item.subClass?.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      {" "}
      x
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <CustomButton
            text="Back to Dashboard"
            onClick={() => navigate("/dashboard")}
            type="rgba(0, 145, 102, 0.78)"
          />
          <h2 style={{ margin: 0 }} onClick={() => setFilteredData(failures)}>
            Failures
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
              <strong>Country:</strong> {selectedRow.country || "N/A"}
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

export default Failures;
