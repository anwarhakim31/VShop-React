import React from "react";
import backgroundImage from "../assets/images/background-text.jpeg";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <section className="container max-w-7xl min-h-[calc(100vh-104px)]  text-center w-full  flex justify-center items-center flex-col">
        <h1
          className={`flex items-center text-8xl lg:text-9xl font-[1000] bg-cover bg-clip-text text-transparent `}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          Oops!
        </h1>
        <h3 className="font-bold text-2xl mt-4 text-center text-primary ">
          404 - PAGE NOT FOUND
        </h3>
        <p className="max-w-[400px] my-4 lg:max-w-[500px] font-semibold text-primary">
          We couldn’t find the page that you’re looking for. Please check the
          address and try again.
        </p>
        <Link
          to={"/"}
          className="px-4 py-2 text-white font-semibold bg-slate-800 rounded-lg"
        >
          Back To Home
        </Link>
      </section>
      <Footer />
    </>
  );
};

export default NotFoundPage;
