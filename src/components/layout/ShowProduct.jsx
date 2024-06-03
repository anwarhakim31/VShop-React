import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { split } from "postcss/lib/list";
import NoProduct from "../element/NoProduct";
import { useFilter } from "../../hooks/filter";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useSearch } from "../../hooks/Search";
const ShowProduct = (props) => {
  const { products, selectCategory } = props;
  const [selectProductCategory, setSelectProductCategory] = useState([]);
  const [byFilter, setByFilter] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const { splitValue } = useSearch();
  const { selectedOption, openFilter } = useFilter();

  useEffect(() => {
    if (splitValue) {
      const keyword = splitValue.split(" ");
      const filteredProduct = selectProductCategory.filter((item) =>
        keyword.every((word) => item.title.toLowerCase().includes(word))
      );

      if (filteredProduct.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
        setSelectProductCategory(filteredProduct);
      }
    } else {
      const product = products.filter(
        (item) => item.category === selectCategory
      );

      if (selectCategory === "all product") {
        setSelectProductCategory(products);
      } else {
        setSelectProductCategory(product);
      }
    }
  }, [splitValue, selectCategory]);

  useEffect(() => {
    let sortedProduct = [...selectProductCategory];

    if (selectProductCategory.length !== 0) {
      const sortFunctions = {
        R1: (a, b) => 0,
        R2: (a, b) => b.price - a.price,
        R3: (a, b) => a.price - b.price,
        R4: (a, b) => a.title.localeCompare(b.title),
        R5: (a, b) => b.title.localeCompare(a.title),
        R6: (a, b) => b.rating.rate - a.rating.rate,
        R7: (a, b) => b.rating.count - a.rating.count,
      };

      const sortFunction = sortFunctions[selectedOption] || sortFunctions.R1;

      sortedProduct.sort(sortFunction);
    }
    setByFilter(sortedProduct);
  }, [selectProductCategory, openFilter]);

  return (
    <ul className=" w-full grid grid-cols-4 mobile:grid-cols-12 xl:grid-cols-10 gap-4 py-6 ">
      {notFound && <NoProduct />}

      {!notFound &&
        byFilter.map((product) => (
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
            <FaRegHeart
              className="absolute top-3 right-3 text-xl cursor-pointer"
              aria-label="add To Wish"
              title="Add To Wishlist"
            />
            {/* <FaHeart className="absolute top-3 right-3 text-xl cursor-pointer fill-red-500" /> */}
          </li>
        ))}
    </ul>
  );
};

export default ShowProduct;
