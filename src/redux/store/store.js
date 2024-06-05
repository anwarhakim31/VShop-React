import { configureStore } from "@reduxjs/toolkit";
import cartReducers from "../slices/cartSlice";
import productReducers from "../slices/productSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducers,
    product: productReducers,
  },
});
