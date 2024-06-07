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
  discountApply,
  discountRemove,
  selectDiscountCode,
  selectDiscountIsApllied,
  selectDiscountValue,
  selectOpenCart,
  selectTotalItemCart,
  selectTotalPayment,
} from "../../redux/slices/cartSlice";
import { RiCoupon2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import useToggleProduct from "../../hooks/redux/toggleProduct";
import ProductModalElement from "../element/products/ProductModalElement";
import { selectSelectedProduct } from "../../redux/slices/productSlice";
import { formatCurrency } from "../../constant/constant";
import discountJson from "../../data/Discount.json";
import { MdClose } from "react-icons/md";
const Modal = () => {
  const { handleToggleWish, state } = useWish();
  const openCart = useSelector(selectOpenCart);
  const handToggleCart = useToggleCart();
  const productFunction = useToggleProduct();
  const { totalPrice } = useSelector(selectSelectedProduct);
  const data = useSelector(selectSelectedProduct);
  const [isCode, setIsCode] = useState("");
  const totalPayment = useSelector(selectTotalPayment);
  const rDispatch = useDispatch();
  const TotalItemCart = useSelector(selectTotalItemCart);
  const DiscountIsApplied = useSelector(selectDiscountIsApllied);
  const DiscountCode = useSelector(selectDiscountCode);
  const DiscoundValue = useSelector(selectDiscountValue);

  const handleChangeInput = (e) => {
    setIsCode(e.target.value);
  };

  const handleBack = () => {
    if (state.openWish) {
      handleToggleWish();
    } else if (openCart) {
      handToggleCart();
    } else if (productFunction.openProduct) {
      productFunction.handleCloseProduct();
    }
  };

  const handleDiscountApply = () => {
    const code = isCode.toUpperCase();
    const discount = discountJson.Discounts.find((item) => item.code === code);

    if (discount) {
      rDispatch(discountApply(discount));
    } else {
      rDispatch(discountApply({ code: "", value: 0 }));
    }
  };

  const handleDiscountRemove = () => {
    rDispatch(discountRemove());
    setIsCode("");
  };

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
        {openCart && (
          <div className="border-t border-gray-300  pt-4  px-4  sticky bg-white bottom-0 left-0  w-full">
            <div
              className={`relative flex items-center px-4 rounded-full border-2 tanslate-y border-gray-200 bg-gray-200 text-xl text-gray-400 font-medium`}
            >
              <RiCoupon2Line className=" text-xl absolute top-1/2 -translate-y-[10px] left-4" />
              <input
                type="text"
                className="bg-gray-200 ml-8 mr-2 outline-none w-full placeholder:text-sm uppercase py-2.5 text-sm text-gray-500"
                placeholder="ADD COUPON CODE"
                onChange={handleChangeInput}
                value={isCode}
                aria-label="input Coupon"
                disabled={DiscountIsApplied || TotalItemCart === 0}
              />
              <button
                className={`${
                  isCode.length > 0 && !DiscountIsApplied ? "block" : "hidden"
                }    text-white font-bold bg-primary px-4 py-2 rounded-full text-sm`}
                onClick={handleDiscountApply}
                aria-label="apply coupon"
              >
                Apply
              </button>
              <button
                className={`group ${
                  DiscountIsApplied ? "block" : "hidden"
                } bg-lime-500 px-2 py-1 text-white font-medium rounded-full flex items-center hover:bg-secon`}
                onClick={handleDiscountRemove}
              >
                <span className="text-sm mr-2"> -{DiscoundValue}%</span>
                <div className="p-1 rounded-full bg-lime-400 text-lg cursor-pointer group-hover:bg-gray-800">
                  <MdClose />
                </div>
              </button>
            </div>
            <div>
              <div className="flex justify-between items-center mt-4">
                <p>Total</p>
                <span className="text-lg font-bold">
                  $ {formatCurrency(totalPayment)} USD
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

export default Modal;
