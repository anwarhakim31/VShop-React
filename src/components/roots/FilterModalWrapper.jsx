// src/ModalWrapper.js
import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "../roots/ModalWrappper.css"; // Perbaiki penamaan file di sini

const ModalWrapper = ({ openFilter, handleOpenFilter, children }) => {
  const nodeRef = useRef(null);
  const overlayRef = useRef(null);

  return ReactDOM.createPortal(
    <React.Fragment>
      <CSSTransition
        in={openFilter}
        timeout={300}
        classNames="modal-overlay"
        unmountOnExit
        nodeRef={overlayRef}
      >
        <div
          ref={overlayRef}
          role="dialog"
          className="modal fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity duration-500 "
        ></div>
      </CSSTransition>
      <CSSTransition
        in={openFilter}
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
            if (e.target === e.currentTarget && handleOpenFilter());
          }}
        >
          {children}
        </div>
      </CSSTransition>
    </React.Fragment>,
    document.getElementById("root-modal")
  );
};

export default ModalWrapper;
