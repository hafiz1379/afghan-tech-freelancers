import React, { useEffect } from "react";
import Stars from "../Stars/Stars";
import { BiDislike, BiLike } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function Review({ reviewData }) {
  const {
    isPending,
    error,
    data: userData,
    refetch
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => newRequest.get(`users/${reviewData.userId}`).then((res) => res.data),
  });

  useEffect(() => {
    refetch()
  }, [userData])

  console.log(userData);
  
  return isPending ? (
    "Loading"
  ) : error ? (
    "Something went wrong"
  ) : (
    <div className="flex flex-col gap-3 mb-10">
      <div className="flex items-center gap-4">
        <img className="w-12 h-12 rounded-full" src={userData.img || "/images/no avatar.jpg"} alt="Reza Merzaee" />
        <div className="flex flex-col gap-1 text-gray-500">
          <h4>{userData.username}</h4>
        </div>
      </div>
      <Stars amount={reviewData.star} />
      <p className="mt-2">{reviewData.desc}</p>
      <div className="flex items-center gap-3 text-gray-500">
        <span className="font-semibold">Helpful? </span>
        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700 hover:scale-110 transition  duration-100">
          <span>Yes</span>
          <BiLike size={24} />
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700 hover:scale-110 transition  duration-100">
          <span>NO</span>
          <BiDislike size={24} />
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Review;
