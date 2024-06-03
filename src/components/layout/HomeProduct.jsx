import React from "react";
import Loading from "../element/Loading";
import ServerError from "../element/ServerError";
import ShowProduct from "./ShowProduct";

const HomeProduct = (props) => {
  const { error, loading, handleReload, products, selectCategory } = props;
  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <ServerError handleReload={handleReload} />
      ) : (
        <ShowProduct products={products} selectCategory={selectCategory} />
      )}
    </>
  );
};

export default HomeProduct;
