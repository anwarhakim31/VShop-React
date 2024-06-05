// src/ModalFilter.js
import React, { createContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import FilterButton from "../../common/FilterButton";
import ModalWrapper from "../../roots/FilterModalWrapper";
import { useFilter } from "../../../hooks/filter";

const filterButton = [
  { id: "R1", name: "Relevance" },
  { id: "R2", name: "Highest Price" },
  { id: "R3", name: "Lowest Price" },
  { id: "R4", name: "A-Z" },
  { id: "R5", name: "Z-A" },
  { id: "R6", name: "Top Rated" },
  { id: "R7", name: "Most Reviewed" },
];

const FilterModal = () => {
  const { selectedOption, setSelectedOption, openFilter, handleOpenFilter } =
    useFilter();

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleReset = () => {
    setSelectedOption("R1");
    handleOpenFilter();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOpenFilter();
  };

  return (
    <ModalWrapper handleOpenFilter={handleOpenFilter} openFilter={openFilter}>
      <div
        className="w-full md:max-w-[500px] p-5 bg-white rounded-lg "
        role="modal"
      >
        <div className="flex justify-between items-center mb-4">
          <button
            className="back block py-2 px-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            aria-label="backToSection"
            title="Back To Section"
            onClick={handleOpenFilter}
          >
            <IoIosArrowBack />
          </button>
          <p className="font-semibold">Filter Setting</p>
          <button
            className="reset block py-2 px-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            title="Reset"
            aria-label="Reset Filter"
            onClick={handleReset}
          >
            <GrPowerReset />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <h3 className="font-semibold mb-4">Sort By:</h3>
          <ul>
            {filterButton.map((button) => (
              <FilterButton
                key={button.id}
                name={button.name}
                id={button.id}
                handleChange={handleChange}
                selectedOption={selectedOption}
              />
            ))}
          </ul>
          <button
            type="submit"
            className="Submit w-full bg-primary rounded-xl p-2.5 hover:bg-secondary text-white font-bold"
            aria-label="submit"
          >
            Show Result
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default FilterModal;
