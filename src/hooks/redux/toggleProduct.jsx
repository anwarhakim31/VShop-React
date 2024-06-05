import React from "react";
import {
  selectOpenProduct,
  isOpenProduct,
  isCloseProduct,
} from "../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

const useToggleProduct = () => {
  const dispatch = useDispatch();
  const openProduct = useSelector(selectOpenProduct);

  const handleOpenProduct = () => {
    dispatch(isOpenProduct());
  };

  const handleCloseProduct = () => {
    dispatch(isCloseProduct());
  };

  if (openProduct) {
    document.querySelector("body").classList.add("overflow-hidden");
  } else {
    document.querySelector("body").classList.remove("overflow-hidden");
  }

  return { handleOpenProduct, openProduct, handleCloseProduct };
};

export default useToggleProduct;
