import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    activeLoading: (state) => {
      state.isLoading = true;
    },
    deactiveLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { activeLoading, deactiveLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
