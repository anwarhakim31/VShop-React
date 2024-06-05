// src/ModalFilter.js
import React, { createContext, useEffect, useReducer, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import ModalWrapper from "../roots/ModalWrapper";
import { useWish } from "../../context/WishListContext";
import WishListElement from "../element/wishlist/WishListModalElement";
import CartListElement from "../element/cart/CartListModalElement";
import useToggleCart from "../../hooks/redux/toggleCart";
import {
  addItemToCart,
  selectDataCart,
  selectOpenCart,
} from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import useToggleProduct from "../../hooks/redux/toggleProduct";
import ProductModalElement from "../element/products/ProductModalElement";
import { selectSelectedProduct } from "../../redux/slices/productSlice";
import { formatCurrency } from "../../constant/constant";

const Modal = () => {
  const { handleToggleWish, state } = useWish();
  const openCart = useSelector(selectOpenCart);
  const handToggleCart = useToggleCart();
  const productFunction = useToggleProduct();
  const { totalPrice } = useSelector(selectSelectedProduct);
  const data = useSelector(selectSelectedProduct);
  const rDispatch = useDispatch();
  const dataInCart = useSelector(selectDataCart);

  const handleBack = () => {
    if (state.openWish) {
      handleToggleWish();
    } else if (openCart) {
      handToggleCart();
    } else if (productFunction.openProduct) {
      productFunction.handleCloseProduct();
    }
  };

  console.log(dataInCart);

  const handleAddToCart = (data) => {
    rDispatch(addItemToCart(data));
    productFunction.handleCloseProduct();
  };

  return (
    <ModalWrapper>
      <div
        className="relative  w-full md:max-w-[500px] py-5 bg-white rounded-lg transition-all duration-300 ease-in-out"
        role="modal"
      >
        <div className="flex justify-between items-center px-5 pb-4">
          <button
            className="back block  py-2 px-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            aria-label="backToSection"
            title="Back To Section"
            onClick={handleBack}
          >
            <IoIosArrowBack />
          </button>
          <p className="font-semibold mx-auto -translate-x-4">
            {openCart && "Cart List"}
            {state.openWish && "Wish List"}
            {productFunction.openProduct && "Detail Product"}
          </p>
        </div>
        <div
          className={`${
            state.openWish ? "overflow-y-auto" : "overflow-auto"
          } h-full w-full`}
        >
          <div
            className="primary-wishlist px-2 h-[52vh]  relative "
            role="primary-modal"
          >
            {state.openWish && <WishListElement />}
            {openCart && <CartListElement />}
            {productFunction.openProduct && <ProductModalElement />}
          </div>
          {}
        </div>
        {productFunction.openProduct && (
          <div className="border-0 border-t border-gray-300 p-4 pb-0">
            <button
              className="w-full bg-primary text-center text-sm font-bold text-white p-4 rounded-xl"
              aria-label="add to cart"
              onClick={() => handleAddToCart(data)}
            >
              Add To Cart <span className="mx-2">|</span>${" "}
              {formatCurrency(totalPrice)}
            </button>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

export default Modal;
