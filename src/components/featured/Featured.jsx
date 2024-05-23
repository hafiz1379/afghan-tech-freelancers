import React from "react";
import { MdSearch } from "react-icons/md";

const Featured = () => {
  return (
    <div className="flex justify-center items-center h-[600px] bg-nav">
      <div className="flex items-center flex-col lg:flex-row text-white xl:gap-14 px-4 ">
        <div className="flex flex-col gap-4 sm:gap-6 xl:gap-8">
          <h1 className="font-poppins text-2xl sm:text-3xl font-semibold">
            Find the right freelance service, right away
          </h1>
          <div className="flex justify-between items-center rounded-md bg-white h-12">
            <div className="flex gap-2 items-center justify-center">
            <MdSearch size={32} className="pl-1 text-gray-600" />
              <input type="text" placeholder="Try" className="border-none outline-none h-12 sm:text-xl text-gray-600"/>
            </div>
            <button className="w-24 bg-main px-2 border-none cursor-pointer h-12 sm:text-xl">Search</button>
          </div>
          <div className="flex items-center gap-3 flex-wrap"> 
            <span className="sm:text-xl font-bold">Popular:</span>
            <button className="bg-transparent px-2 py-1 text-sm cursor-pointer border border-gray-300 rounded-3xl sm:text-xl">Web Design</button>
            <button className="bg-transparent px-2 py-1 text-sm cursor-pointer border border-gray-300 rounded-3xl sm:text-xl">AI Service</button>
            <button className="bg-transparent px-2 py-1 text-sm cursor-pointer border border-gray-300 rounded-3xl sm:text-xl">UI/UX</button>
            <button className="bg-transparent px-2 py-1 text-sm cursor-pointer border border-gray-300 rounded-3xl sm:text-xl">Wordpress</button>
          </div>
        </div>
        <div>
            <img src="/images/man.png" alt=""/>
        </div>
      </div>
    </div>
  );
};

export default Featured;