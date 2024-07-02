import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { HiOutlineRefresh } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { MdAccessTime } from "react-icons/md";
import newRequest from "../../utils/newRequest";
import Stars from "../../components/Stars/Stars";
import ReviewContainer from "../../components/reviews/ReviewContainer";

const Gig = () => {
  const { id } = useParams();
  const {
    isPending,
    error,
    data: gig,
    refetch,
  } = useQuery({
    queryKey: ["gigData", 1, "1"],
    queryFn: () =>
      newRequest
        .get(`gigs/single/${id}`)
        .then((res) => res.data)
        .catch((err) => err),
  });

  const {
    isPending: isLoadingUser,
    error: userError,
    data: userData,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["userData", 2, "2"],
    queryFn: () =>
      newRequest
        .get(`users/${gig.userId}`)
        .then((res) => res.data)
        .catch((err) => err),
  });

  useEffect(() => {
    refetch();
    refetchUsers();
  }, [gig, userData]);

  return (
    <div className="grid lg:grid-cols-3 px-4 md:px-10 sm:p-6 md:mt-6 lg:gap-8 relative">
      {isPending ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <>
          {/* Left */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="breadcrumb">ATF &gt;&gt; {gig.cat}</span>
            <h1 className="text-2xl font-bold font-poppins">{`${gig.title}`}</h1>

            {isLoadingUser ? (
              "Loading"
            ) : userError ? (
              "Something went wrong"
            ) : (
              <div className="flex items-center gap-2 h-12">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img className="h-full object-cover" src={userData.img || "/images/no avatar.jpg"} alt="" />
                </div>
                <span className="font-semibold text-2xl text-gray-500">{userData.username}</span>

                {/* User Stars */}
                {!isNaN(gig.totalStars / gig.starNumber) && <Stars amount={Math.round(gig.totalStars / gig.starNumber)} />}
              </div>
            )}

            <div className="max-w-[500px] mx-auto my-6 rounded overflow-hidden">
              <img
                src={
                  gig.images.length
                    ? gig.images[0]
                    : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                }
                alt="Gig Image"
              />
            </div>
            <h2 className="h2">About this job</h2>
            <p className="text-gray-500 font-normal text-lg leading-7">{gig.desc}</p>

            {isLoadingUser ? "Loading" : userError ? "Something went wrong." : <Seller data={userData} />}
            <ReviewContainer gigId={gig._id} />
          </div>
          {/* Right */}
          <div className="lg:col-span-1">
            <Price data={gig} />
          </div>
        </>
      )}
    </div>
  );
};

const Price = ({ data }) => {
  return (
    <div className="border rounded p-5 flex flex-col gap-2 md:sticky md:top-32">
      <div className="price font-bold font-poppins text-gray-600 flex justify-between mb-2.5 ">
        <h3>{data.shortTitle}</h3>
        <span>{data.price}</span>
      </div>
      <p>{data.shortDesc}</p>
      <div className="details flex items-center justify-between my-3">
        <div className="item flex gap-1 items-center">
          <MdAccessTime size={24} />
          <p className="font-semibold">{data.deliveryTime} days delivery</p>
        </div>
        <div className="item flex gap-1 items-center justify-center">
          <HiOutlineRefresh size={24} />
          <p className="font-semibold">{data.revisionNumber} Revisions</p>
        </div>
      </div>
      <div className="features">
        {data.features.map((feature) => {
          return (
            <div key={feature} className="item flex gap-2 text-gray-500 leading-8 items-center">
              <FaCheck className="text-green-500" />
              <span>{feature}</span>
            </div>
          );
        })}
      </div>
      <button className="w-full p-3 bg-green-500 hover:bg-green-600 transition duration-200 text-white rounded">Continue</button>
    </div>
  );
};

const Seller = ({ data }) => {
  return (
    <div className="mt-10 flex flex-col text-gray-600">
      <h2>About the seller</h2>
      <div className="flex items-center gap-8">
        <img className="max-w-24 max-h-24 rounded-full object-cover" src={data.img ? data.img : "/images/no avatar.jpg"} alt="" />

        <div className="flex flex-col gap-1 items-start">
          <span className="font-semibold text-xl text-gray-700">{data.username}</span>
          <Stars />
          <button className="bg-white rounded-md border-gray-400 border py-1 px-5 font-semibold">Contact Me</button>
        </div>
      </div>
      <div className="border-gray-400 border p-6 rounded-sm mt-6">
        {/* <div className="grid md:grid-cols-2 gap-4 font-semibold">
          <div className="md:col-span-1">
            <div className="flex flex-wrap justify-start gap-4 my-3">
              <span className="title">From</span>
              <span className="description">{data.country}</span>
            </div>
            <div className="flex flex-wrap justify-start gap-4 my-3">
              <span className="title">Ave responsive time</span>
              <span className="description">5 hours</span>
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="flex flex-wrap justify-start gap-4 my-3">
              <span className="title">Language</span>
              <span className="description">Dari, Pashto, English</span>
            </div>
            <div className="flex flex-wrap justify-start gap-4 my-3">
              <span className="title">From</span>
              <span className="description">Afghanistan</span>
            </div>
          </div>
        </div>
        <hr className="my-2" /> */}
        <p>{data.desc}</p>
      </div>
    </div>
  );
};

export default Gig;
