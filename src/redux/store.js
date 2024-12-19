import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import engineReducer from "./engineSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    eng: engineReducereReducer,
  },
});

export default store;
