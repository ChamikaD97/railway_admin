import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  engineData: null,
};

const enginesSlice = createSlice({
  name: "eng",
  initialState,
  reducers: {
    engines(state, action) {
      state.engineData= action.payload;
    },
  },
});

export const { engines } = enginesSlice.actions;
export default enginesSlice.reducer;
