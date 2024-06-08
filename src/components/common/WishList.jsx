import React from "react";
import { useWish } from "../../context/WishListContext";
import { IoMdClose } from "react-icons/io";
import { formatCurrency } from "../../constant/constant";
import { useDispatch } from "react-redux";
import {
  isOpenProduct,
  selectOpenProduct,
} from "../../redux/slices/productSlice";
import { addItemToCart } from "../../redux/slices/cartSlice";
import useToggleCart from "../../hooks/redux/toggleCart";
const WishList = ({ item }) => {
  const { handleToggleWish, state, dispatch } = useWish();
  const rDispatch = useDispatch();
  const handleToggleCart = useToggleCart();

  const handleRemoveFromWishlist = (id) => {
    dispatch({ type: "DELETE_FROM_LIST", payload: id });

    if (state.wishlist.length === 1) {
      localStorage.removeItem("VShopWishlist");
    }
  };

  const handleOpenProductModal = (item) => {
    handleToggleWish();

    rDispatch(
      addItemToCart({
        ...item,
        quantity: 1,
        totalPrice: item.price,
        point: item.id,
      })
    );
    dispatch({ type: "DELETE_FROM_LIST", payload: item.id });

    const openCart = setTimeout(() => handleToggleCart(), 200);

    return () => clearTimeout(openCart);
  };

  return (
    <div
      key={item.id}
      className="flex items-center py-4 border-b-2 border-dotted  border-gray-200 "
    >
      <div className="h-20 w-20 p-4">
        <img
          src={item.image}
          alt={""}
          className="w-full h-full object-contain object-center block"
        />
      </div>
      <div className="w-full flex-col">
        <div className="flex justify-between items-start w-full">
          <div>
            <h1 className="font-bold capitalize mb-2 line-clamp-2 text-sm hover:line-clamp-none">
              {item.title}
            </h1>
            <p className="font-gray-300 capitalize text-xs">{item.category}</p>
          </div>
          <button
            aria-label="deleteFromCart"
            className="text-gray-500 hover:text-red-500 "
            onClick={() => handleRemoveFromWishlist(item.id)}
          >
            <IoMdClose />
          </button>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-sm ">
            $ {formatCurrency(item.price)} USD
          </span>
          <button
            aria-label="addToCart"
            className="py-1.5 px-4 rounded-lg bg-primary text-sm font-medium text-white hover:bg-secon"
            onClick={() => handleOpenProductModal(item)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishList;
