import { createSlice } from "@reduxjs/toolkit";

const chatModalSlice = createSlice({
  name: "chatModal",
  initialState: {
    isShow: false,
  },
  reducers: {
    openChatModal: (state) => {
      state.isShow = true;
    },
    closeChatModal: (state) => {
      state.isShow = false;
    },
  },
});

export const { closeChatModal, openChatModal } = chatModalSlice.actions;

export default chatModalSlice.reducer;
