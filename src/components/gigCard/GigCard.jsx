import React from "react";
import { Link } from "react-router-dom";

const GigCard = ({ item }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
      <Link to="/gig/123">
        <div className="max-w-xs rounded overflow-hidden shadow-md h-full">
          <img src={item.img} alt="" className="w-full h-40 object-cover" />
          <div className="px-6 py-4">
            <div className="flex items-center mb-2">
              <img src={item.pp} alt="" className="w-10 h-10 rounded-full mr-2" />
              <span className="text-sm font-semibold">{item.username}</span>
            </div>
            <p className="text-gray-700 text-base">{item.desc}</p>
            <div className="flex items-center mt-4">
              <img src="./images/star.png" alt="" className="w-4 h-4 mr-1" />
              <span className="text-yellow-500">{item.star}</span>
            </div>
          </div>
          <hr className="border-gray-200" />
          <div className="px-6 py-4 flex justify-between items-center">
            <img src="./images/heart.png" alt="" className="w-6 h-6" />
            <div className="text-right">
              <span className="text-gray-500 text-sm">STARTING AT</span>
              <h2 className="text-lg font-semibold">${item.price}</h2>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GigCard;
