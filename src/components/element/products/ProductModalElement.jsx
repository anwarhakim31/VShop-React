import React from "react";
import {
  selectSelectedProduct,
  setSelectedProduct,
} from "../../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useWish } from "../../../context/WishListContext";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
const ProductModalElement = () => {
  const isSelectedProduct = useSelector(selectSelectedProduct);
  const ReduxDispatch = useDispatch();
  const { quantity, price, id } = isSelectedProduct;

  const { handleToWishList, state, dispatch } = useWish();

  const handleDeleteFromWishlist = (product) => {
    dispatch({ type: "DELETE_FROM_LIST", payload: product.id });
  };

  const handleIncreamentProduct = () => {
    ReduxDispatch(
      setSelectedProduct({
        ...isSelectedProduct,
        quantity: quantity + 1,
        totalPrice: price * (quantity + 1),
      })
    );
  };

  const handleDecreamentProduct = () => {
    ReduxDispatch(
      setSelectedProduct({
        ...isSelectedProduct,
        quantity: quantity - 1,
        totalPrice: price * (quantity - 1),
      })
    );
  };

  const isWish = (productItem) =>
    state.wishlist.some((item) => productItem.id === item.id);

  return (
    <>
      {
        <div className="p-2">
          <figure className="relative p-4 w-full h-36 border border-gray-300 rounded-xl ">
            <img
              src={isSelectedProduct?.image}
              alt=""
              className="w-full h-full object-contain object-center block"
            />
            <button
              aria-label="add To Wish"
              title="Add To Wishlist"
              onClick={() =>
                isWish(isSelectedProduct)
                  ? handleDeleteFromWishlist(isSelectedProduct)
                  : handleToWishList(isSelectedProduct)
              }
            >
              {isWish(isSelectedProduct) ? (
                <FaHeart className="absolute top-3 right-3 text-xl cursor-pointer fill-red-500" />
              ) : (
                <FaRegHeart className="absolute top-3 right-3 text-xl cursor-pointer" />
              )}
            </button>
          </figure>
          <div className="flex justify-between mt-6 items-start">
            <div>
              <h1 className="font-bold text-sm  capitalize">
                {isSelectedProduct?.title}
              </h1>
              <span className="text-gray-500 text-sm capitalize">
                {isSelectedProduct?.category}
              </span>
            </div>

            <div className="rounded-full bg-yellow-100 flex items-center py-0.5 px-2">
              <FaStar className=" fill-yellow-400  text-sm mr-2" />{" "}
              <span className=" text-yellow-500 font-bold text-sm">
                {isSelectedProduct?.rating.rate}
              </span>
            </div>
          </div>
          <div className="mt-2">
            <h3 className="font-medium text-gray-700 text-sm mb-2">
              Description
            </h3>
            <p className="text-[13px] text-normal text-gray-500 line-clamp-2 hover:line-clamp-none">
              {isSelectedProduct?.description}
            </p>
          </div>
          <div className="flex gap-4 my-4">
            <div>
              <span className="font-medium  text-gray-700 text-sm">
                Quantity
              </span>
            </div>

            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
              <button
                className="text-gray-700 py-1.5 px-2.5 text-sm disabled:text-gray-400 disabled:cursor-not-allowed"
                type="button"
                aria-label="minus quantity"
                disabled={isSelectedProduct?.quantity === 1}
                onClick={handleDecreamentProduct}
              >
                {" "}
                <FaMinus />
              </button>
              <p className="font-normal text-sm  text-gray-500">
                {isSelectedProduct?.quantity}
              </p>
              <button
                className="text-gray-700 py-1.5 px-2.5 text-sm"
                type="button"
                aria-label="plus quantity"
                onClick={handleIncreamentProduct}
              >
                {" "}
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default ProductModalElement;
