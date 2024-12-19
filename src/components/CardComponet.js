// CardComponent.js
import React from "react";
import { Card, Button } from "antd";
import "../App.css"; // Import the CSS file
import { Badge, Space, Switch } from "antd";
import ImageCard from "./Image";
import { Row, Col, Modal } from "antd";
import { Typography } from "antd";

const { Title } = Typography;
const { Meta } = Card;

const CardComponent = ({
  title,
  description,
  imageUrl,
  buttonText,
  children,
  onCardClick,
}) => {
  const l = JSON.parse(localStorage.getItem("engineData"));

  return (
    <div>
      <Card hoverable className="card"  onClick={onCardClick}>
      <Typography.Title  level={3} style={{ margin: 5 }}>
       {title}
      </Typography.Title>
        <Card
       
          bordered={true}
         
        >
          {children}
        </Card>
        <Row gutter={25} style={{ marginBottom: 15 }}>
          
         
        </Row>
      </Card>
    </div>
  );
};

export default CardComponent;
