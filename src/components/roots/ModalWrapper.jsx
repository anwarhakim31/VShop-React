import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { useWish } from "../../context/WishListContext";
import "../roots/ModalWrappper.css"; // Pastikan penamaan file benar
import { useSelector } from "react-redux";
import useToggleCart from "../../hooks/redux/toggleCart";
import useToggleProduct from "../../hooks/redux/toggleProduct";

const ModalWrapper = ({ children }) => {
  const { state, handleToggleWish } = useWish();
  const overlayRef = useRef();
  const nodeRef = useRef();
  const openCart = useSelector((state) => state.cart.openCart);
  const handleToggleCart = useToggleCart();
  const productFunction = useToggleProduct();
  const [isOpen, setIsOpen] = useState({
    open: state.openWish,
    toggle: handleToggleWish,
  });

  useEffect(() => {
    setIsOpen({
      open: state.openWish || openCart || productFunction.openProduct,
      toggle:
        (state.openWish && handleToggleWish) ||
        (openCart && handleToggleCart) ||
        (productFunction.openProduct && productFunction.handleCloseProduct),
    });
  }, [state.openWish, handleToggleWish, openCart, productFunction.openProduct]);

  return ReactDOM.createPortal(
    <>
      <CSSTransition
        in={isOpen.open}
        timeout={300}
        classNames="modal-overlay"
        unmountOnExit
        nodeRef={overlayRef}
      >
        <div
          ref={overlayRef}
          role="dialog"
          className="fixed z-[50]  inset-0 bg-black  bg-opacity-50 backdrop-blur-sm transition-opacity duration-500"
          onClick={() => isOpen.toggle()}
        ></div>
      </CSSTransition>
      <CSSTransition
        in={isOpen.open}
        timeout={300}
        classNames="modal"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div
          ref={nodeRef}
          role="dialog"
          className="fixed top-0 left-0 w-full min-h-screen z-[100] flex justify-center items-end md:items-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              isOpen.toggle();
            }
          }}
        >
          {children}
        </div>
      </CSSTransition>
    </>,
    document.getElementById("root-modal")
  );
};

export default ModalWrapper;
