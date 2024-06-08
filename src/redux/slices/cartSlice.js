import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = "anwarhakim2024";

const loadCartFromStorage = () => {
  try {
    const encryptedData = localStorage.getItem("vCart");

    if (!encryptedData) {
      return [];
    }

    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);

    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData || [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);

    return [];
  }
};

const SaveCartToStorage = (cartData) => {
  try {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(cartData),
      ENCRYPTION_KEY
    ).toString();
    localStorage.setItem("vCart", encryptedData);
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const initialState = {
  data: loadCartFromStorage(),
  openCart: false,
  coupon: {
    isApplied: false,
    code: "",
    value: 0,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.openCart = !state.openCart;
    },
    addItemToCart: (state, action) => {
      const newItem = action.payload;

      const countItem = newItem.quantity ? newItem.quantity : 1;
      const countPrice = action.payload.totalPrice
        ? action.payload.totalPrice
        : action.payload.price;

      const selectIndex = state.data.findIndex(
        (product) => product.id === action.payload.id
      );
      const countPoint = newItem.point ? newItem.point : newItem.id;

      if (selectIndex !== -1) {
        state.data[selectIndex].quantity += countItem;
        state.data[selectIndex].totalPrice =
          state.data[selectIndex].quantity * action.payload.price;
        state.data[selectIndex].point =
          state.data[selectIndex].quantity * newItem.id;
      } else {
        state.data.push({
          ...action.payload,
          quantity: countItem,
          totalPrice: countPrice,
          point: countPoint,
        });
      }
      SaveCartToStorage(state.data);
    },
    minusItemInCart: (state, action) => {
      const selectIndex = state.data.findIndex(
        (item) => item.id === action.payload.id
      );

      if (selectIndex !== -1) {
        if (state.data[selectIndex].quantity > 1) {
          state.data[selectIndex].quantity -= 1;
          state.data[selectIndex].totalPrice =
            state.data[selectIndex].quantity * action.payload.price;
          state.data[selectIndex].id = action.payload.id;
        } else {
          state.data = state.data.filter((item) => {
            return item.id !== action.payload.id;
          });
        }
      }
      SaveCartToStorage(state.data);
    },
    removeInCart: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    discountApply: (state, action) => {
      state.coupon = {
        isApplied: true,
        ...action.payload,
      };
    },
    clearCart: (state) => {
      state.data = [];
      SaveCartToStorage(state.data);
    },

    discountRemove: (state) => {
      state.coupon = {
        isApplied: false,
        code: "",
        value: 0,
      };
    },
  },
});

export const {
  toggleCart,
  addItemToCart,
  minusItemInCart,
  discountApply,
  discountRemove,
  removeInCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectOpenCart = (state) => state.cart.openCart;
export const selectDataCart = (state) => state.cart.data;
export const selectTotalItemCart = (state) =>
  state.cart.data.reduce((total, item) => total + item.quantity, 0);
export const selectTotalPayment = (state) =>
  state.cart.data.reduce((total, item) => total + item.totalPrice, 0);
export const selectDiscountIsApllied = (state) => state.cart.coupon.isApplied;
export const selectDiscountCode = (state) => state.cart.coupon.code;
export const selectDiscountValue = (state) => state.cart.coupon.value;
export const selectTotalPoint = (state) =>
  state.cart.data.reduce((total, item) => total + item.point, 0);
