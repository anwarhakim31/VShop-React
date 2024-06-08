// src/ModalFilter.js
import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
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
  selectDataCart,
  selectDiscountCode,
  selectDiscountIsApllied,
  selectDiscountValue,
  selectOpenCart,
  selectTotalItemCart,
  selectTotalPayment,
  selectTotalPoint,
} from "../../redux/slices/cartSlice";
import { RiCoupon2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import useToggleProduct from "../../hooks/redux/toggleProduct";
import ProductModalElement from "../element/products/ProductModalElement";
import { selectSelectedProduct } from "../../redux/slices/productSlice";
import { formatCurrency } from "../../constant/constant";
import discountJson from "../../data/Discount.json";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
const Modal = ({ handleOpenCheckout }) => {
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
  const DiscountAmount = useMemo(
    () => (DiscoundValue * totalPayment) / 100,
    [totalPayment, DiscoundValue]
  );
  const TotalDiscountPrice = useMemo(
    () => totalPayment - DiscountAmount,
    [totalPayment, DiscountAmount]
  );
  const dataInCart = useSelector(selectDataCart);
  const TotalPoint = useSelector(selectTotalPoint);

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

  const handleCheckOut = () => {
    const phone = 6281310635243;
    const message =
      encodeURIComponent(`Halo Admin,\nSaya ingin melakukan checkout untuk pembelian barang-barang berikut :
     ${dataInCart.map(
       (item, i) => `\n${i + 1} ${item.title} *Qty : ${item?.quantity}*`
     )} \n \nTotal Barang : *${TotalItemCart}*   \nSubTotal : *$${formatCurrency(
        totalPayment
      )} USD*\n${
        DiscountIsApplied && !DiscountCode !== 0
          ? `Diskon : *${formatCurrency(
              DiscountAmount
            )} USD* (${DiscoundValue}%)\n`
          : ""
      }Total Pembayaran : *${formatCurrency(
        TotalDiscountPrice
      )} USD*\n\nMohon bantu konfirmasi ketersediaan stok dan informasi lanjut untuk proses pembayaran. Terima kasih!
      `);

    const URL_CHECKOUT = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;

    window.open(URL_CHECKOUT, "__blank");

    handToggleCart();
    handleOpenCheckout();
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
            className={`${
              openCart ? "h-[42vh]" : "h-[52vh]"
            } primary-wishlist px-2   relative`}
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
              className={`${
                DiscountIsApplied && DiscountCode === ""
                  ? "border-red-500 bg-red-50 text-red-800"
                  : "border-transparent bg-gray-200  text-gray-500"
              } relative flex items-center px-4 rounded-full border-2 tanslate-y  text-xl font-medium  `}
            >
              <RiCoupon2Line className=" text-xl absolute top-1/2 -translate-y-[10px] left-4" />
              <input
                type="text"
                className={`${
                  DiscountIsApplied && DiscountCode === ""
                    ? "border-red-50 bg-red-50 text-red-800"
                    : "border-transparent bg-gray-200  text-gray-500"
                } ml-8 mr-2 outline-none w-full placeholder:text-sm uppercase border-2 py-2.5 text-sm`}
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
                  DiscountIsApplied && DiscountCode !== "" ? "block" : "hidden"
                } bg-lime-500 px-2 py-1 text-white font-medium rounded-full flex items-center hover:bg-secon`}
                onClick={handleDiscountRemove}
              >
                <span className="text-sm mr-2"> -{DiscoundValue}%</span>
                <div className="p-1 rounded-full bg-lime-400 text-lg cursor-pointer group-hover:bg-gray-800">
                  <MdClose />
                </div>
              </button>
              <button
                className={`group ${
                  DiscountIsApplied && DiscountCode === "" ? "block" : "hidden"
                } bg-primary px-1.5 py-1.5 text-white font-medium rounded-full flex items-center hover:bg-secon`}
                onClick={handleDiscountRemove}
              >
                <MdClose />
              </button>
            </div>
            <p
              className={`${
                DiscountIsApplied && DiscountCode === "" ? "block" : "hidden"
              } text-red-500 text-sm mt-2`}
            >
              Coupon code is invalid.{" "}
              <Link
                to={"https://github.com/anwarhakim31/VShop-React"}
                target="__blank"
                className=" underline"
              >
                Get your coupon code
              </Link>
            </p>

            <div
              className={`${
                DiscountIsApplied && DiscountCode !== ""
                  ? "flex items-center justify-between"
                  : "hidden"
              }  text-sm mt-4 text-gray-500`}
            >
              <p>Subtotal</p>
              <p className="font-bold">${formatCurrency(totalPayment)}</p>
            </div>

            <div
              className={`${
                DiscountIsApplied && DiscountCode !== ""
                  ? "flex items-center justify-between"
                  : "hidden"
              }  text-sm mt-1 text-gray-500`}
            >
              <p>Discount</p>
              <p className="font-bold text-secon">
                ${formatCurrency(DiscountAmount)}
              </p>
            </div>

            <div className={`${!DiscountIsApplied ? "mt-4" : "mt-2"}`}>
              <div className="flex justify-between items-center">
                <p className="font-light">Total</p>
                <span className="text-lg font-bold">
                  $ {formatCurrency(TotalDiscountPrice)} USD
                </span>
              </div>
              <div className="flex justify-between item-center">
                <small className="text-gray-400 text-[11px]">{`With this order you will earn ${TotalPoint} points`}</small>
                <small className="text-gray-400 text-[11px]">{`VAT include`}</small>
              </div>
            </div>
            <button
              className={`
            bg-primary rounded-xl text-sm font-bold py-4 px-4 mt-4 text-white w-full disabled:bg-gray-400 disabled:cursor-not-allowed`}
              disabled={TotalItemCart === 0}
              onClick={handleCheckOut}
              aria-label="checkout button"
            >
              Proceed to Checkout (WhatsApp)
            </button>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

export default Modal;
