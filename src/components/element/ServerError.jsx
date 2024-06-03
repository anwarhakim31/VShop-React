import React from "react";
import image from "../../assets/images/server-error.png";

const ServerError = ({ handleReload }) => {
  return (
    <div className="show-product flex justify-center items-center flex-col my-14 w-full  min-h-[62vh] lg:min-h-[68vh]">
      <img src={image} alt="Error" className="max-w-36 max-h-36 mx-auto " />
      <p className="font-semibold mb-4">
        {" "}
        An error occurred while loading data, Try Again.
      </p>
      <button
        onClick={handleReload}
        className="px-4 py-1.5 bg-secon rounded-lg text-bold text-white hover:bg-blue-5W00"
      >
        Reload
      </button>
    </div>
  );
};

export default ServerError;
