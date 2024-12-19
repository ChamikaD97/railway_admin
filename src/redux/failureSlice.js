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
    engineFailures(state, action) {
      state.engineData= action.payload;
    },
    pendingEngineFailures(state, action) {
      state.engineData= action.payload;
    },
    inProgressEngineFailures(state, action) {
      state.engineData= action.payload;
    },
    completedEngineFailures(state, action) {
      state.engineData= action.payload;
    },
  },
});

export const { failures,engineFailures, pendingEngineFailures,completedEngineFailures, inProgressEngineFailures } = failuresSlice.actions;
export default failuresSlice.reducer;
