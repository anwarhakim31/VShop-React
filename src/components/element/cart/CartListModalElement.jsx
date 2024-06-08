import React, { useState } from "react";
import NoCartlist from "./NoCartlist";

import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  minusItemInCart,
  removeInCart,
  selectDataCart,
} from "../../../redux/slices/cartSlice";
import { MdClose } from "react-icons/md";
import { formatCurrency } from "../../../constant/constant";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
const CartListModalElement = () => {
  let dataInCart = useSelector(selectDataCart);

  const rDispatch = useDispatch();

  const handleIncreament = (product) => {
    const selectedProduct = { ...product, quantity: 1 };

    rDispatch(addItemToCart(selectedProduct));
  };

  const handleDecreament = (product) => {
    rDispatch(minusItemInCart(product));
  };

  const handleRemoveInCart = (id) => {
    rDispatch(removeInCart(id));
  };

  return (
    <>
      {dataInCart.length === 0 ? (
        <NoCartlist />
      ) : (
        <div className="">
          {dataInCart.map((product) => (
            <div
              key={product.id}
              className="flex items-center border-xl border-b p-4 gap-4 border-gray-300"
            >
              <figure className="h-14 w-14 mx-auto">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain object-center"
                />
              </figure>
              <div className="w-full">
                <div className="flex justify-between items-start flex-1">
                  <div>
                    <h1 className="text-gray-700 font-bold text-sm">
                      {product.title}
                    </h1>
                    <span className="text-xs capitalize font-medium text-gray-500">
                      {product.category}
                    </span>
                  </div>
                  <button
                    aria-label="delete to cart"
                    className="text-xl"
                    onClick={() => handleRemoveInCart(product.id)}
                  >
                    <MdClose />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <h6 className="font-bold">
                    $ {formatCurrency(product.price)} USD
                  </h6>
                  <div className="flex rounded-full border border-gray-300 items-center">
                    <button
                      aria-label="min-button"
                      className="py-1.5 px-2.5 text-xs"
                      onClick={() => handleDecreament(product)}
                    >
                      {<FaMinus />}
                    </button>
                    <p className="text-sm  text-gray-400 font-medium">
                      {product.quantity}
                    </p>
                    <button
                      aria-label="plus-button"
                      className="py-1.5 px-2.5 text-sm"
                      onClick={() => handleIncreament(product)}
                    >
                      {<FaPlus />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CartListModalElement;
