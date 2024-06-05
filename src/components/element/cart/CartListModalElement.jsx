import React, { useState } from "react";
import NoCartlist from "./NoCartlist";
import { RiCoupon2Line } from "react-icons/ri";

const CartListModalElement = () => {
  const [inputCoupon, setInputCoupn] = useState("");

  const handleChangeInput = (e) => {
    setInputCoupn(e.target.value);
  };

  return (
    <>
      <NoCartlist />

      <div className="border-t border-gray-300 mt-8 p-4">
        <div
          className={`relative flex items-center px-4 rounded-full border-2 tanslate-y border-gray-200 bg-gray-200 text-xl text-gray-400 font-medium`}
        >
          <RiCoupon2Line className=" text-xl absolute top-1/2 -translate-y-[10px] left-4" />
          <input
            type="text"
            className="bg-gray-200 ml-8 mr-2 outline-none w-full placeholder:text-sm uppercase py-2.5 text-sm text-gray-500"
            placeholder="ADD COUPON CODE"
            onChange={handleChangeInput}
            value={inputCoupon}
            aria-label="input Coupon"
          />
          <button
            className={`${
              inputCoupon ? "block" : "hidden"
            }  text-white font-bold bg-primary px-4 py-2 rounded-full text-sm`}
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default CartListModalElement;
