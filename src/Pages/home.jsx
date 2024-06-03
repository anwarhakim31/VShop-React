import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import HomeHeader from "../components/layout/HomeHeader";
import axios from "axios";
import { UrlP } from "../constant/constant";
import HomeProduct from "../components/layout/HomeProduct";
import Footer from "../components/layout/Footer";

import ModalFilter from "../components/element/FilterModal";
import ModalWish from "../components/element/WishlistModal";
import SearchProvider from "../hooks/Search";
import FilterProvider from "..//hooks/filter";

const HomePage = () => {
  const [products, setProdutcs] = useState([]);
  const [selectCategory, setSelectCategory] = useState("all product");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(0);

  const handleReload = () => {
    setReload(reload + 1); // Set reload state menjadi true
  };

  const handleSelectCategory = (nama) => {
    setSelectCategory(nama);
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(UrlP + "products");
        if (res.status === 200) {
          setProdutcs(res.data);

          setError(false);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    getProduct();
  }, [reload]);

  return (
    <SearchProvider>
      <FilterProvider>
        <Header />
        <main>
          <section id="home ">
            <div className="mt-28 container max-w-7xl mx-auto px-5 sm:px-6 min-h-[calc(100vh-216px)]">
              <HomeHeader
                handleSelectCategory={handleSelectCategory}
                selectCategory={selectCategory}
                error={error}
                loading={loading}
              />
              <HomeProduct
                products={products}
                error={error}
                loading={loading}
                handleReload={handleReload}
                selectCategory={selectCategory}
              />
            </div>
          </section>
        </main>
        <Footer loading={loading} />

        <ModalFilter />
        <ModalWish />
      </FilterProvider>
    </SearchProvider>
  );
};

export default HomePage;
