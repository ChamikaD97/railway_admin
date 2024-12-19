import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import engineReducer from "./engineSlice";
import failureReducer from "./failureSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    eng: engineReducer,
    fail: failureReducer
  },
});

export default store;
