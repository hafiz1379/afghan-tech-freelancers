import React, { useState } from "react";
import { gigs } from "../../data";
import GigCard from "../../components/gigCard/GigCard";

const Gigs = () => {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  return (
    <div className="p-4 lg:p-12">
      <div className="flex flex-col gap-4">
        <span className="font-semibold text-gray-500 text-md">Afghan Tech Freelancers</span>
        <h1 className="text-2xl font-bold">AI Artists</h1>
        <p className="text-gray-600 font-semibold">
          Explore the world of AI-generated art and find the perfect piece for your home or office.
        </p>
        <div className="flex items-center justify-between flex-col md:flex-row md:pr-10 lg:pr-4">
          <div className="flex flex-col md:flex-row  items-center gap-3 text-gray-500 font-normal mb-2 lg:mb-0">
            <span>Budget</span>
            <input type="text" placeholder="min" className="p-1 outline-none border-gray-500 border" />
            <input type="text" placeholder="max" className="p-1 outline-none border-gray-500 border" />
            <button className="bg-green-500 text-white font-medium border-none px-2 py-1 rounded-md cursor-pointer">Apply</button>
          </div>
          <div className="flex items-center gap-2 relative">
            <span className="text-gray-500 font-light">Sort By</span>
            <span className="font-medium cursor-pointer" onClick={() => setOpen(!open)}>{sort === "sales" ? "Best Selling" : "Newest"}</span>
            <img src="./images/down.png" alt="down" className="w-4 cursor-pointer" onClick={() => setOpen(!open)} />
            {open && (
              <div className="p-2 bg-white rounded-sm border border-gray-300 absolute top-8 right-0 text-gray-600">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")} className="cursor-pointer">Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")} className="cursor-pointer">Best Selling</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap">
          {gigs.map(gig => (
            <GigCard key={gig.id} item={gig} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
