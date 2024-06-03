import React from "react";
import logo from "/vite.svg";
import { IoCartOutline } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
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
          <FaClipboardList className="text-white text-xl cursor-pointer hover:scale-110 transition-all duration-300 " />
          <IoCartOutline className="text-white text-2xl cursor-pointer hover:scale-110 transition-all duration-300 " />
        </div>
      </div>
    </header>
  );
};

export default Header;
