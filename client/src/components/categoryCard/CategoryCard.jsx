import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`gigs?categoryId=${category._id}`}>
      <div className="h-96 text-white rounded-xl m-2 cursor-pointer relative overflow-hidden">
        <img src={category.img} alt={category.title} className="w-full object-cover h-full" />

        <div className="absolute top-2 left-2 right-2">
          <span className="font-semibold text-lg inline-block mb-3 drop-shadow-lg bg-main px-3 rounded-full">
            {category.title}
          </span>
          <span className="font-normal block drop-shadow-lg bg-black bg-opacity-80 px-2 rounded">
            {category.desc}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
