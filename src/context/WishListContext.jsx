import React, {
  createContext,
  useReducer,
  useContext,
  useState,
  useEffect,
} from "react";
import CryptoJS from "crypto-js";

const secretKey = "my-secret-key-12345"; // Contoh secret key

const initialState = {
  wishlist: [],
  openWish: false,
};

const ADD_TO_LIST = "ADD_TO_LIST";
const TOGGLE_WISH_LIST = "TOGGLE_WISH_LIST";
const DELETE_FROM_LIST = "DELETE_FROM_LIST";
const SET_WISHLIST = "SET_WISHLIST";

const wishListReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_LIST:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    case TOGGLE_WISH_LIST:
      return { ...state, openWish: !state.openWish };
    case DELETE_FROM_LIST:
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
      };
    case SET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };
    default:
      return state;
  }
};

const wishContext = createContext();

export const useWish = () => {
  return useContext(wishContext);
};

const WishListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishListReducer, initialState);
  const [iSep, setIsep] = useState(false);

  const handleToggleCart = () => {
    setIsep(!iSep);
  };

  const handleToggleWish = () => {
    dispatch({ type: TOGGLE_WISH_LIST });

    if (!state.openWish) {
      document.querySelector("body").classList.add("overflow-hidden");
    } else {
      document.querySelector("body").classList.remove("overflow-hidden");
    }
  };

  const handleToWishList = (product) => {
    state.wishlist.find((item) => item.id === product.id)
      ? state.wishlist
      : dispatch({ type: ADD_TO_LIST, payload: product });
  };

  useEffect(() => {
    const productString = JSON.stringify(state.wishlist);
    const encryptedData = CryptoJS.AES.encrypt(
      productString,
      secretKey
    ).toString();

    if (state.wishlist.length !== 0) {
      localStorage.setItem("VShopWishlist", encryptedData);
    }
  }, [state]);
  useEffect(() => {
    const wishlistLS = localStorage.getItem("VShopWishlist");

    if (wishlistLS) {
      const bytes = CryptoJS.AES.decrypt(wishlistLS, secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      const wishlistArray = JSON.parse(decryptedData);

      dispatch({ type: SET_WISHLIST, payload: wishlistArray });
    }
  }, []);

  return (
    <wishContext.Provider
      value={{
        state,
        dispatch,
        handleToggleWish,
        handleToWishList,
        handleToggleCart,
        iSep,
      }}
    >
      {children}
    </wishContext.Provider>
  );
};

export default WishListProvider;
