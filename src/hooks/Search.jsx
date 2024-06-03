import React, { createContext, useContext, useEffect, useState } from "react";

export const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

const SearchProvider = ({ children }) => {
  const [searchValue, setSerchValue] = useState("");
  const [splitValue, setSplitValue] = useState("");

  const handleSearchChange = (e) => {
    setSerchValue(e.target.value);
  };

  useEffect(() => {
    setSplitValue(searchValue.trim().toLowerCase());
  }, [searchValue]);

  return (
    <SearchContext.Provider
      value={{ searchValue, setSerchValue, handleSearchChange, splitValue }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
