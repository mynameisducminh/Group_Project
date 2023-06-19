import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  DataProduct: {
    data: [],
    total: 1,
  },
  payload: {
    page: 1,
    limit: 9,
    searchKeyword: "",
  },
};

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    addDataProduct: (state, { payload }) => {
      state.DataProduct.data = [payload.data];
      state.DataProduct.total = payload.total;
    },
    changePayload: (state, { payload }) => {
      state.payload = payload;
    },
    resetPayload: (state) => {
      state.payload = initialState.payload;
    },
  },
});

export const { addDataProduct, changePayload, resetPayload } =
  ProductSlice.actions;

export default ProductSlice.reducer;
