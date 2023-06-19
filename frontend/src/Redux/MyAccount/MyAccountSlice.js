import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  DataUser: {},
};

const MyAccountSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    dataUser: (state, { payload }) => {
      state.DataUser = payload;
      localStorage.setItem("DataUser", JSON.stringify(state.DataUser));
    },
    resetDataUser: (state) => {
      state.DataUser = initialState.DataUser;
      localStorage.setItem("DataUser", JSON.stringify(state.DataUser));
    },
  },
});

export const { dataUser } = MyAccountSlice.actions;

export default MyAccountSlice.reducer;
