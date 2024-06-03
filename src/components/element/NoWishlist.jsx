import React from "react";
import emptyWhislist from "../../assets/images/empty-wishlist.png";
import { useWish } from "../../context/WishListContext";
const NoWishlist = () => {
  const { handleToggleWish, state } = useWish();
  return (
    <li className="mt-10 flex flex-col justify-center items-center">
      <img src={emptyWhislist} alt="empty" className="w-32 h-32 block " />
      <h1 className="font-medium text-gray-500 text-sm mt-4">
        Your wishlist is empty
      </h1>
      <p className="text-gray-400 text-xs mt-1">
        Tap the heart on any item to start saving your favorites ✨.
      </p>
      <button
        aria-label="continue-shopping"
        onClick={handleToggleWish}
        className="font-medium px-4 mt-4 text-white py-1.5 rounded-lg text-sm bg-secon hover:bg-blue-500"
      >
        Continue Shopping
      </button>
    </li>
  );
};

export default NoWishlist;
