import React from "react";
import { IoFootballOutline } from "react-icons/io5";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen text-neutral-800 dark:text-gray-100 dark:bg-gray-950">
      <div>
        <h1 className="text-xl md:text-6xl font-bold flex items-center">
          L
          <IoFootballOutline className="animate-spin h-10 w-10 ml-2" />
          ading
          <span className="animate-bounce ml-1 ">.</span>
          <span className="animate-bounce ml-1 delay-[10.5]">.</span>
          <span className="animate-bounce ml-1 delay-[10.5]">.</span>
          <span className="animate-bounce ml-1 delay-500">.</span>
        </h1>
      </div>
    </div>
  );
};

export default Spinner;
