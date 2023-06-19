import { configureStore } from "@reduxjs/toolkit";
import ChatBoxReducer from "./Chatbot/ChatSlice";
import ProductReducer from "./Product/ProductSlice";
import UserReducer from "./MyAccount/MyAccountSlice";

export const Store = configureStore({
  reducer: {
    DataChat: ChatBoxReducer,
    DataProduct: ProductReducer,
    DataMyAccount: UserReducer,
  },
});
