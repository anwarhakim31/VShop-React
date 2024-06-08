import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FaCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  discountRemove,
  selectDataCart,
  selectDiscountValue,
  selectTotalItemCart,
  selectTotalPayment,
  selectTotalPoint,
} from "../../../redux/slices/cartSlice";
import { formatCurrency } from "../../../constant/constant";
import logo from "/public/vite.svg";
import { FaAngleDown } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";

function ModalOverlay({ children, onClose, isOpen, isDropitem }) {
  return (
    <div
      className={`fixed left-0 top-0  w-full h-full min-h-screen bg-blue-700 overflow-y-auto z-[100] transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <div className="w-full h-full flex justify-center items-center ">
        <div
          className={`${
            isDropitem ? "h-full py-5" : ""
          }mx-4 w-full max-w-[24rem] relative`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

const Checkout = ({ CloseCheckout, dateTime }) => {
  const [isOpen, setIsOpen] = useState(false);
  const TotalPayment = useSelector(selectTotalPayment);
  const DiscountValue = useSelector(selectDiscountValue);
  const TotalCart = useSelector(selectTotalItemCart);
  const dataInCart = useSelector(selectDataCart);
  const [isDropitem, setIsDropItem] = useState(false);
  const TotalPoint = useSelector(selectTotalPoint);
  const dispatch = useDispatch();

  const dateCheckout = dateTime?.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const timeCheckout = dateTime?.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  const TotalPaymentDiscount =
    TotalPayment - (TotalPayment * DiscountValue) / 100;

  const handleToShop = () => {
    dispatch(clearCart());
    dispatch(discountRemove());
    CloseCheckout();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpen(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay isOpen={isOpen} isDropitem={isDropitem}>
          <h6 className="text-gray-50 font-bold text-lg pb-6 text-center pt-5">
            Checkout Receipt
          </h6>
          <div
            className={`bg-white rounded-t-2xl px-4 pb-5 py-6 relative ${
              isDropitem ? "mb-8" : "mb-1"
            }`}
          >
            <div className="relative text-center mb-4 ">
              <FaCircle className="w-24 h-24 fill-blue-800 mx-auto" />
              <FaCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 fill-orange-400 mx-auto" />
              <FaCheck
                className={`${
                  isOpen ? "scale-100 opacity-100" : "scale-150 opacity-0"
                } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 fill-white  mx-auto transition-all duration-1000 ease-in-out`}
              />
            </div>
            <h5 className="text-center text-gray-800 font-bold text-xl mb-2">
              Checkout Success
            </h5>
            <p className="text-gray-400 mb-4 text-center">
              Your checkout process has been successful! We have received your
              order.
            </p>
            <p className="text-gray-400 mb-2 text-center">Total Payment</p>
            <h4 className=" text-gray-400 text-center line-through">
              ${formatCurrency(TotalPayment)} USD
            </h4>
            <h1 className="text-center text-3xl font-bold">
              ${formatCurrency(TotalPaymentDiscount)} USD
            </h1>
            <div className="relative">
              <hr className="mt-4 mb-3 border-[1.5px] border-gray-300 border-dashed" />
              <div className="absolute top-1/2 -left-7 transform -translate-y-1/2 w-6 h-6 bg-blue-700 rounded-full"></div>
              <div className="absolute top-1/2 -right-7 transform -translate-y-1/2 w-6 h-6 bg-blue-700 rounded-full"></div>
            </div>
            <p className="font-semibold text-gray-400 mb-2.5">Payment for</p>
            <div className="bg-gray-200 py-2.5 px-3 rounded-xl ">
              <div className="flex items-center space-x-2.5">
                <figure className="w-10 h-10 bg-white overflow-hidden rounded-xl p-2">
                  <img
                    src={logo}
                    alt="logo"
                    className="object-contain w-full h-full object-center block"
                  />
                </figure>
                <div className="w-full">
                  <h5 className="text-base font-medium">{TotalCart} items</h5>
                  <small className="text-sm mt-1 text-gray-400">
                    {dateCheckout} . {timeCheckout}
                  </small>
                </div>
                <button
                  className={`${
                    isDropitem ? "rotate-180" : ""
                  } rounded-xl bg-white p-2 text-gray-500`}
                  onClick={() => setIsDropItem(!isDropitem)}
                >
                  <FaAngleDown />
                </button>
              </div>
              <div
                className={`${
                  isDropitem
                    ? "translate-y-0 opacity-100 "
                    : "-translate-y-1/2 opacity-0"
                } duration-100 transition-all ease-in-out`}
              >
                {isDropitem &&
                  dataInCart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-2.5 mt-4"
                    >
                      <figure className="w-8 h-8 bg-white overflow-hidden rounded-xl p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-contain w-full h-full object-center block"
                        />
                      </figure>
                      <div className="w-full">
                        <h5 className="text-xs ">{item.title} items</h5>
                        <small className="text-xs mt-1 text-gray-400">
                          {item.quantity} x {item.totalPrice}
                        </small>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <small className="mt-2 text-center block">
              Complate your payment and you will obtain{" "}
              <span className="text-secon font-medium">
                {TotalPoint} Points{" "}
              </span>
            </small>
            <button
              aria-label="Done"
              className="bg-secon w-full my-4 text-white rounded-xl font-bold p-2.5 hover:bg-primary"
              onClick={handleToShop}
            >
              Done
            </button>
            <span
              className="text-medium block text-center cursor-pointer p-1 text-secon"
              onClick={handleToShop}
            >
              Shop More
            </span>
            <div className="absolute -bottom-3.5 left-0 w-full ">
              <div className="flex justify-center items-center space-x-1">
                {[...Array(13)].map(() => (
                  <div
                    key={uuidv4()}
                    className="w-6 h-6  rounded-full bg-blue-700"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </ModalOverlay>,
        document.getElementById("root-checkout")
      )}
    </>
  );
};

export default Checkout;
