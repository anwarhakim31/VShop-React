import React from "react";
import logo from "/vite.svg";
import { IoCartOutline } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useWish } from "../../context/WishListContext";
import useToggleCart from "../../hooks/redux/toggleCart";

const Header = () => {
  const { state, handleToggleWish } = useWish();
  const handleToggleCart = useToggleCart();

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
              <span className="absolute flex h-3 w-3 -top-1 -right-1 ">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75  border-slate-900"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}

            <FaClipboardList />
          </button>
          <button
            type="button"
            aria-label="ShoppingCart"
            onClick={handleToggleCart}
          >
            <IoCartOutline
              className={`text-white text-2xl cursor-pointer hover:scale-110 transition-all duration-300`}
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
