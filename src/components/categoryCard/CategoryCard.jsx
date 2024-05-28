import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ item }) => {
  return (
    <Link to="/gigs/123">
      <div className="w-80 h-80 text-white rounded cursor-pointer relative">
        <img src={item.img} alt={item.title} className="w-full object-cover" />
        {/* Card description */}
        <span className="font-normal absolute top-4 left-4">{item.desc}</span>

        {/* Card Title */}
        <span className="font-semibold text-lg absolute top-10 left-4">
          {item.title}
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
