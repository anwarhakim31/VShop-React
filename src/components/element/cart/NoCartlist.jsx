import React from "react";
import emptyCartList from "../../../assets/images/empty-cart.png";
import useToggleCart from "../../../hooks/redux/toggleCart";

const NoCartlist = () => {
  const handleToggleCart = useToggleCart();

  return (
    <div className="mt-10 flex flex-col justify-center items-center">
      <img src={emptyCartList} alt="empty" className="w-32 h-32 block " />
      <h1 className="font-medium text-gray-500 text-sm mt-4">
        Your cartlist is empty
      </h1>
      <p className="text-gray-400 text-xs mt-1">
        Add something to make me happy 😃
      </p>
      <button
        aria-label="continue-shopping"
        className="font-medium px-4 mt-4 text-white py-1.5 rounded-lg text-sm bg-secon hover:bg-blue-500"
        onClick={handleToggleCart}
      >
        Shop Now
      </button>
    </div>
  );
};

export default NoCartlist;
