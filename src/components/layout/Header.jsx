import React, { useState } from "react";
import logo from "/vite.svg";
import { IoCartOutline } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useWish } from "../../context/WishListContext";
import useToggleCart from "../../hooks/redux/toggleCart";
import { selectTotalItemCart } from "../../redux/slices/cartSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const { state, handleToggleWish } = useWish();
  const handleToggleCart = useToggleCart();
  const TotalItemCart = useSelector(selectTotalItemCart);

  return (
    <header className="fixed top-0 left-0 w-full bg-primary py-5 z-50">
      <div className=" container flex justify-between items-center px-4 max-w-[1280px] mx-auto">
        <Link to={"/"}>
          <figure className="flex items-center hover:scale-110 transition-all duration-300 cursor-pointer">
            <img src={logo} alt="logo" width={32} height={32} />
            <figcaption className="text-white font-bold text-xl ml-2 hidden mobile:block">
              VShop
            </figcaption>
          </figure>
        </Link>

        <h5 className="text-white font-bold text-xl ml-2 block mobile:hidden">
          Vshop
        </h5>
        <div className="extra flex gap-5 items-center">
          <button
            aria-label="Wishlist"
            type="button"
            className={`relative text-white text-xl cursor-pointer hover:scale-110 transition-all duration-300`}
            onClick={handleToggleWish}
          >
            {state.wishlist.length > 0 && (
              <span className="absolute flex h-4 w-4 -top-1.5 -right-2 ">
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-slate-800"></span>
              </span>
            )}

            <FaClipboardList />
          </button>
          <button
            type="button"
            aria-label="ShoppingCart"
            onClick={handleToggleCart}
            className="relative"
          >
            <IoCartOutline
              className={` text-white text-2xl cursor-pointer hover:scale-110 transition-all duration-300`}
            />
            {TotalItemCart > 0 && (
              <span className="absolute flex h-4 w-4 -top-1 -right-1 ">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75  border-slate-900"></span>
                <span className="relative flex justify-center items-center text-xs rounded-full h-4 w-4 text-white bg-red-500">
                  {TotalItemCart}
                </span>
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
