import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  console.log(data);

  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 py-4 sm:px-2">
      <Link to={`/gig/${item._id}`}>
        <div className=" rounded overflow-hidden shadow-md h-full">
          <img src={item.cover} alt="" className="w-full h-40 object-cover" />
          <div className="px-6 py-4">
            {isLoading ? (
              "Loading"
            ) : error ? (
              "Something went wrong"
            ) : (
              <div className="flex items-center mb-2">
                <img
                  src={data.images || "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"}
                  alt=""
                  className="w-10 h-10 rounded-full mr-2"
                />
                <span className="text-sm font-semibold">{data.username}</span>
              </div>
            )}
            <h1 className="font-bold leading-6">{item.title}</h1>
            <p className="text-gray-700 text-base">{item.desc}</p>
            <div className="flex items-center mt-4">
              <FaStar className="text-yellow-500 w-4 h-4 mr-1" />
              <span className="text-yellow-500">
                {!isNaN(item.totalStars / item.starNumber) && Math.round(item.totalStars / item.starNumber)}
              </span>
            </div>
          </div>
          <hr className="border-gray-200" />
          <div className="px-6 py-4 flex justify-between items-center">
            <FaHeart className="text-gray-500 w-6 h-6" />
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
