import React from "react";
import { useWish } from "../../../context/WishListContext";
import WishList from "../../common/WishList";
import NoWishlist from "./NoWishlist";
const WishListModalElement = () => {
  const { handleToggleWish, state } = useWish();
  const wishlist = state.wishlist;

  return (
    <>
      {wishlist.length === 0 ? (
        <NoWishlist />
      ) : (
        wishlist.map((item) => {
          return <WishList key={item.id} item={item} />;
        })
      )}
      {}
    </>
  );
};

export default WishListModalElement;
