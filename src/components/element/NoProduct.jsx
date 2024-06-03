import React from "react";
import image from "../../assets/images/empty-boxpng.png";

const NoProduct = () => {
  return (
    <li className="show-product flex justify-center flex-col items-center my-6  w-full min-h-[62vh] col-span-12 mobile:min-h-[68vh]">
      <img src={image} alt="Error" className="max-w-36 max-h-36 mx-auto " />
      <p className="font-semibold mb-4"> No Product Found.</p>
    </li>
  );
};

export default NoProduct;
