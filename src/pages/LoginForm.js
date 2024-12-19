import React from "react";
import { Form, Input, Button, Checkbox, message, Flex } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import CenteredCard from "../components/CenteredCard";
import CustomButton from "../components/CustomButton";

import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = () => {
    alert("sss");
  };
  

  const handleLogin = () => {
    const userData = { username:'u', password :'p'};
    dispatch(login(userData));
    navigate('/dashboard')
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CenteredCard>
        <Input
          size="large"
          placeholder="Computer Number"
          style={{
            padding: 10,
          }}
          prefix={
            <UserOutlined
              style={{
                paddingRight: 5,
              }}
            />
          }
        />
        <br /> <br />
        <Input
          size="large"
          placeholder="Password"
          type="password"
          style={{
            padding: 10,
          }}
          prefix={
            <LockOutlined
              style={{
                paddingRight: 5,
              }}
            />
          }
        />
        <br /> <br />
        <Flex gap="small" wrap>
          {" "}
          <CustomButton
            text="Login"
            onClick={handleLogin}
            type="rgba(0, 22, 145, 0.78)"
          />{" "}
          <CustomButton
            text="Register"
            onClick={handleRegister}
            type="rgba(53, 145, 0, 0.78)"
          />
        </Flex>
      </CenteredCard>
    </div>
  );
};

export default LoginForm;
