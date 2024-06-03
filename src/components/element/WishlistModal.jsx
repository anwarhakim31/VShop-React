// src/ModalFilter.js
import React, { createContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

import WishlistWrapper from "../roots/WishlistModalWrapper";
import NoWishlist from "./NoWishlist";
import { useWish } from "../../context/WishListContext";
import WishList from "../common/WishList";

const FilterModal = () => {
  const { handleToggleWish, state, dispatch } = useWish();

  const wishlist = state.wishlist;

  return (
    <WishlistWrapper>
      <div
        className="relative w-full md:max-w-[500px] py-5 bg-white rounded-lg "
        role="modal"
      >
        <div className="flex justify-between items-center px-5">
          <button
            className="back block  py-2 px-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            aria-label="backToSection"
            title="Back To Section"
            onClick={handleToggleWish}
          >
            <IoIosArrowBack />
          </button>
          <p className="font-semibold mx-auto -translate-x-4">Wish List</p>
        </div>
        <div className="overflow-y-auto h-full w-full px-4">
          <ul className="primary-wishlist px-2 h-[52vh]  " role="primary-modal">
            {wishlist.length === 0 ? (
              <NoWishlist />
            ) : (
              wishlist.map((item) => {
                return <WishList key={item.id} item={item} />;
              })
            )}
            {}
          </ul>
        </div>
      </div>
    </WishlistWrapper>
  );
};

export default FilterModal;
