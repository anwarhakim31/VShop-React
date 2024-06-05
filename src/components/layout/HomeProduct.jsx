import React, { useEffect, useReducer, useState } from "react";

import Loading from "../element/products/Loading";
import ServerError from "../element/products/ServerError";
import { useFilter } from "../../hooks/filter";
import { useSearch } from "../../hooks/Search";
import CardList from "../common/CardList";
import NoProduct from "../element/products/NoProduct";

const HomeProduct = (props) => {
  const { error, loading, handleReload, products, selectCategory } = props;
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
  }, [splitValue, selectCategory, loading, error]);

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
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <ServerError handleReload={handleReload} />
      ) : (
        <ul className=" w-full grid grid-cols-4 mobile:grid-cols-12 xl:grid-cols-10 gap-4 py-6 ">
          {notFound && <NoProduct />}

          {!notFound &&
            byFilter.map((product) => (
              <CardList key={product.id} product={product} />
            ))}
        </ul>
      )}
    </>
  );
};

export default HomeProduct;
