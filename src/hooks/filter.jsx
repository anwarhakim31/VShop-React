import React, { createContext, useContext, useState, useEffect } from "react";

export const filterContext = createContext();

export const useFilter = () => {
  return useContext(filterContext);
};

const FilterProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState("R1");
  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => {
    setOpenFilter((prevState) => !prevState);
  };

  useEffect(() => {
    if (openFilter) {
      document.querySelector("body").classList.add("overflow-hidden");
    }

    return () => {
      document.querySelector("body").classList.remove("overflow-hidden");
    };
  }, [openFilter]);

  return (
    <filterContext.Provider
      value={{
        selectedOption,
        setSelectedOption,
        handleOpenFilter,
        openFilter,
      }}
    >
      {children}
    </filterContext.Provider>
  );
};

export default FilterProvider;
