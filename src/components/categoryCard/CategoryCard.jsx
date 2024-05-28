import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ item }) => {
  return (
    <Link to="/gigs/123">
      <div className="h-96 text-white rounded-xl m-2 cursor-pointer relative overflow-hidden">
        <img src={item.img} alt={item.title} className="w-full object-cover" />
        {/* Card description */}
        <span className="font-normal absolute top-4 left-4 drop-shadow-lg bg-black bg-opacity-80 px-2 rounded-full">
          {item.desc}
        </span>

        {/* Card Title */}
        <span className="font-semibold text-lg absolute top-12 left-4 drop-shadow-lg bg-main px-3 rounded-full">
          {item.title}
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
