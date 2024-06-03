import React from "react";
import { FaStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { split } from "postcss/lib/list";
import { useWish } from "../../context/WishListContext";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
const CardList = ({ product }) => {
  const { handleToWishList, state, dispatch } = useWish();
  const isWish = state.wishlist.some((item) => {
    return item.id === product.id;
  });

  const handleDeleteFormWishList = (id) => {
    dispatch({ type: "DELETE_FROM_LIST", payload: id });

    if (state.wishlist.length === 1) {
      localStorage.removeItem("VShopWishlist");
    }
  };

  return (
    <li
      key={product.id}
      className="relative border border-gray-200 w-full col-span-full xs:col-span-2 mobile:col-span-4 rounded-2xl md:col-span-3  xl:col-span-2 flex flex-col justify-between  p-3"
    >
      <div className="mb-2 flex flex-col justify-between flex-1">
        <div className="mb-1">
          <figure className="w-full h-32 mx-auto rounded-2xl bg-white p-4 overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              aria-label={`product-${product.title}`}
              className=" w-full h-full object-contain object-center"
            />
          </figure>
          <span className="block capitalize text-xs text-gray-500 mb-0.5 mobile:mb-1">
            {product.category}
          </span>
          <h1 className="text-xs font-bold text-gray-700 capitalize line-clamp-2 hover:line-clamp-none mb-2 mobile:mb-2.5">
            {product.title}
          </h1>
        </div>
        <div>
          <p className="text-xs text-gray-500 flex">
            {" "}
            <FaStar className=" fill-yellow-300  text-sm mr-2" />{" "}
            {product.rating.rate} | ({product.rating.count}) Review
          </p>
        </div>
      </div>
      <button
        className=" group w-full relative  mt-2 rounded-full flex justify-between items-center font-semibold text-sm px-4 bg-gray-100 py-2 before:absolute before:inset-0 before:w-0 hover:before:w-full before:bg-secon before:rounded-full before:transition-all  before:duration-300 before:ease-out gru"
        type="button"
        title="Add To Cart"
      >
        $ {product.price}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 font-semibold text-sm group-hover:opacity-100  text-white">
          Buy Now
        </div>
        <div className="absolute rounded-full top-0.5 group-hover:hidden right-0.5 w-8 h-8 bg-primary flex justify-center items-center">
          <FaPlus className="text-white" />
        </div>
      </button>
      <button
        aria-label="add To Wish"
        title="Add To Wishlist"
        onClick={() =>
          isWish
            ? handleDeleteFormWishList(product.id)
            : handleToWishList(product)
        }
      >
        {isWish ? (
          <FaHeart className="absolute top-3 right-3 text-xl cursor-pointer fill-red-500" />
        ) : (
          <FaRegHeart className="absolute top-3 right-3 text-xl cursor-pointer" />
        )}
      </button>
    </li>
  );
};

export default CardList;
