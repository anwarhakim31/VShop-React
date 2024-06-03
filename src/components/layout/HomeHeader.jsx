import React, { useEffect, useState } from "react";
import backgroundImage from "../../assets/images/background-text.jpeg";
import { CiSearch } from "react-icons/ci";
import filterLogo from "../../assets/images/filter.svg";
import axios from "axios";
import { UrlP } from "../../constant/constant";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";
import { useFilter } from "../../hooks/filter";
import { useSearch } from "../../hooks/Search";
const categorys = [
  "all product",
  "men's clothing",
  "jewelery",
  "electronics",
  "women's clothing",
];

const HomeHeader = (props) => {
  const {
    error,
    handleSelectCategory,
    selectCategory,

    loading,
  } = props;

  const { searchValue, handleSearchChange } = useSearch();
  const { handleOpenFilter, selectedOption, openFilter } = useFilter();
  const [isChange, setIsChange] = useState("R1");

  useEffect(() => {
    setIsChange(selectedOption);
  }, [openFilter]);

  return (
    <>
      <h1
        className="text-center font-bold text-3xl bg-cover bg-clip-text text-transparent"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        Shop Now
      </h1>
      <div className="mt-10 flex flex-col-reverse lg:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-3 order-2 w-full ">
          <div className="relative ml-auto w-full lg:w-64 ">
            <CiSearch className="ml-2 text-2xl top-1/2 -translate-y-1/2 text-slate-400 absolute" />
            <input
              type="text"
              className="py-1.5 w-full pl-10 border-2 rounded-full outline-secon outline-offset-2"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <button
              className={`relative w-[2.375rem] h-[2.375rem] rounded-full bg-primary grid place-items-center hover:bg-secon ${
                isChange !== "R1"
                  ? "   before:absolute before:w-4 before:h-4 before:border-2 before:border-white before:bg-red-500 before:rounded-full before:block before:-top-1 before:-right-1"
                  : ""
              }`}
              title="Filter"
              aria-label="filter"
              onClick={handleOpenFilter}
            >
              <img src={filterLogo} alt="filter" />
            </button>
          </div>
        </div>
        <div className="category flex items-center justify-center w-full gap-4 md:hidden py-2">
          <Swiper spaceBetween={25} slidesPerView={2} className="z-0">
            {categorys.map((category, i) => (
              <SwiperSlide key={i} className="max-w-fit z-0">
                <button
                  onClick={() => handleSelectCategory(category)}
                  type="button"
                  disabled={error || loading}
                  className={`
                    ${loading || error ? "border-gray-200" : ""}
                  ${
                    selectCategory === category
                      ? "border-blue-600"
                      : "border-gray-200"
                  }  px-2 whitespace-nowrap py-1.5 disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:bg-gray-200  text-sm w-auto bg-gray-200 rounded-full hover:bg-slate-300 capitalize font-medium border-2 `}
                >
                  {category}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="category md:flex items-center w-full hidden gap-4 py-2">
          {categorys.map((category, i) => (
            <button
              onClick={() => handleSelectCategory(category)}
              key={i}
              type="button"
              disabled={error || loading}
              className={`
                ${loading || error ? "border-gray-200" : ""}
              
              ${
                selectCategory === category
                  ? "border-blue-600"
                  : "border-gray-200"
              } disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:text-slate-400 px-2 whitespace-nowrap py-1.5 text-sm w-auto bg-gray-200 rounded-full hover:bg-slate-300 capitalize font-medium border-2 `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeHeader;
