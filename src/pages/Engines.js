import React, { useState } from "react";
import { Table, Modal, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";

const Engines = () => {
  const dispatch = useDispatch();
  const { engineData } = useSelector((state) => state.eng);

  const [tableData, setTableData] = useState(engineData);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filteredData, setFilteredData] = useState(engineData);

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

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    if (!value) {
      setFilteredData(engineData);
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
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f4f4f4",
        borderRadius: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>Engine Data</h2>
        <Input
          placeholder="Search by Class or Sub Class"
          onChange={handleSearch}
          style={{ width: "300px", height: "40px", borderRadius: "15px" }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        scroll={{ x: true }}
        bordered
        style={{
          borderRadius: "15px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      />
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

export default Engines;
