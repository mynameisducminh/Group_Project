import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  DataChat: [
    {
      type: "bot",
      message:
        "Chào bạn tôi là Matthew. Tôi là trợ lý ảo của MAFLINE. Tôi có thể giúp gì cho bạn.",
    },
  ],
};

const ChatSlice = createSlice({
  name: "ChatBox",
  initialState,
  reducers: {
    AddDataChat: (state, { payload }) => {
      state.DataChat = [...state.DataChat, payload];
    },
    CleanDataChat: (state) => {
      state.DataChat = initialState.DataChat;
    },
  },
});

export const { AddDataChat, CleanDataChat } = ChatSlice.actions;

export default ChatSlice.reducer;
