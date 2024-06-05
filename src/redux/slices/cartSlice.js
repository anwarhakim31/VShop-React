import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  openCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.openCart = !state.openCart;
    },
    addItemToCart: (state, action) => {
      const countItem = action.payload.quantity ? action.payload.quantity : 1;
      const countPrice = action.payload.totalPrice
        ? action.payload.totalPrice
        : action.payload.price;

      const match = state.data.findIndex(
        (product) => product.id === action.payload.id
      );

      if (match === 0) {
        state.data[match].quantity += countItem;
        state.data[match].totalPrice =
          state.data[match].quantity * (action.payload.price + 1);
        state.data[match].id = action.payload.id;
      } else {
        state.data.push({
          ...action.payload,
          quantity: countItem,
          totalPrice: countPrice,
        });
      }
    },
  },
});

export const { toggleCart, addItemToCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectOpenCart = (state) => state.cart.openCart;
export const selectDataCart = (state) => state.cart.data;
