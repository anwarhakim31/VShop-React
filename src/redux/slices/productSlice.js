import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openProduct: false,
  selectedProduct: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    isOpenProduct: (state) => {
      state.openProduct = true;
    },
    isCloseProduct: (state) => {
      state.openProduct = false;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const {
  isOpenProduct,
  isCloseProduct,
  setSelectedProduct,
  setIncreamentProduct,
} = productSlice.actions;
export default productSlice.reducer;

export const selectOpenProduct = (state) => state.product.openProduct;
export const selectSelectedProduct = (state) => state.product.selectedProduct;
