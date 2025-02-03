// CardComponent.js
import React from "react";
import { Card, Button, Statistic } from "antd";
import "../App.css"; // Import the CSS file
import { Badge, Space, Switch } from "antd";
import ImageCard from "./Image";
import { Row, Col, Modal } from "antd";
import { Typography } from "antd";
import CountUp from "react-countup";

const { Title } = Typography;
const { Meta } = Card;

const CardComponent = ({
  title,
  description,
  imageUrl,
  buttonText,
  children,
  val,
  onCardClick,
}) => {
  const l = JSON.parse(localStorage.getItem("engineData"));

  return (
    <div>
      <Card hoverable className="card"  onClick={onCardClick}>
      <Typography.Title  level={3} style={{ margin: 5 , color:'white'}}>
       {title}
      </Typography.Title>
        {/* <Card
       
          bordered={true}
         
        >
          {children}
        </Card> */}
      
      </Card>
    </div>
  );
};

export default CardComponent;
