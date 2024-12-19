// CardComponent.js
import React from "react";
import { Card, Button } from "antd";
import "../App.css"; // Import the CSS file
import { Badge, Space, Switch } from "antd";
import ImageCard from "./Image";
import { Row, Col, Modal } from "antd";

const { Meta } = Card;

const CardComponent = ({
  title,
  description,
  imageUrl,
  buttonText,
  onButtonClick,
}) => {
  const l = JSON.parse(localStorage.getItem("engineData"));

  return (
    <div>
      <Card hoverable className="card">
        <Row gutter={25} style={{ marginBottom: 15 }}>
          <Col span={4}>
            <ImageCard />
          </Col>
          <Col span={20}>
            <Meta title={title} />
            
            {l.length}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CardComponent;
