import React from "react";

const Loading = () => {
  return (
    <div className="show-product flex justify-center flex-col items-center my-6  w-full min-h-[62vh]  mobile:min-h-[68vh]">
      <div className="w-10 h-10 rounded-full animate-spin border-8 border-solid border-secon border-t-transparent"></div>
    </div>
  );
};

export default Loading;
