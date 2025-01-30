import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message, Flex } from "antd";
import { useDispatch } from "react-redux";
import { login, userToken } from "../redux/authSlice";
import CenteredCard from "../components/CenteredCard";
import CustomButton from "../components/CustomButton";
import { ToastContainer, toast } from "react-toastify";

import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/register");
  };
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = "http://13.61.26.58:5000";
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/user/login`, {
        comNum: "Admin",
        password: "Admin",
      });

      if (response.status === 200) {
        dispatch(login(response.data.user));
        dispatch(userToken(response.data.token));
        setIsLoading(false);

        navigate("/dashboard");
      } else if (response.status === 401) {
        navigate("/");
      } else if (response.status === 404) {
      } else if (response.status === 201) {
      } else {
      }
    } catch (error) {
      setIsLoading(false);
    }
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
        <ToastContainer />
      </CenteredCard>
    </div>
  );
};

export default LoginForm;
