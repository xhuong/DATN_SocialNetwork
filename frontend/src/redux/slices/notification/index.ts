import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    count: 0,
  },
  reducers: {
    increaseCount: (state) => {
      state.count += 1;
    },
    resetCount: (state) => {
      state.count = 0;
    },
  },
});

export const { resetCount, increaseCount } = notificationSlice.actions;

export default notificationSlice.reducer;
