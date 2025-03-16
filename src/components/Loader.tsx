import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
        <div className="absolute top-[60px] left-0 w-full h-1.5 bg-primary-light opacity-50 rounded-full animate-shadow" />
        <div className="absolute w-full h-full bg-primary rounded-md animate-jump" />
      </div>
    </div>
  );
};

export default Loader;
