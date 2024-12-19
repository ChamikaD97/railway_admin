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

export const { engines } = enginesSlice.actions;
export default enginesSlice.reducer;
