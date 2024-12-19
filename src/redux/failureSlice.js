import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  engineData: null,
};

const failuresSlice = createSlice({
  name: "engFailures",
  initialState,
  reducers: {
    failures(state, action) {
      state.engineData= action.payload;
    },
  },
});

export const { failures } = failuresSlice.actions;
export default failuresSlice.reducer;
