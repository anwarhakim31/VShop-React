import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../redux/slices/cartSlice";

const useToggleCart = () => {
  const dispatch = useDispatch();
  const openCart = useSelector((state) => state.cart.openCart);

  const handleToggleCart = () => {
    dispatch(toggleCart());

    if (!openCart) {
      document.querySelector("body").classList.add("overflow-hidden");
    }
  };

  return handleToggleCart;
};

export default useToggleCart;
