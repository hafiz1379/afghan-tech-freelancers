import React from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { HiOutlineRefresh, HiStar } from "react-icons/hi";
import { MdAccessTime } from "react-icons/md";

const Gig = () => {
  return (
    <div className="grid lg:grid-cols-3 md:px-10 sm:p-6 md:mt-6 lg:gap-8 relative">
      {/* Left */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <span className="font-semibold text-sm text-gray-400">
          ATF &gt;&gt; Responsive Web Design
        </span>
        <h1 className="text-2xl font-bold font-poppins">
          I wil create stunning, reponsive websites for you.
        </h1>

        <div className="flex items-center gap-2 h-12">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img
              className="h-full object-cover"
              src="https://avatars.githubusercontent.com/u/117447018?v=4"
              alt=""
            />
          </div>
          <span className="font-semibold text-2xl text-gray-500">
            Hafizullah Rasa
          </span>
          <Stars />
        </div>

        <div className="max-w-[500px] mx-auto my-6 rounded overflow-hidden">
          <img
            className="w-full"
            src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
        </div>
        <h2 className="h2">About this job</h2>
        <p className="text-gray-500 font-normal text-lg leading-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur,
          ab, eligendi perspiciatis delectus sit libero modi excepturi molestias
          repellat facere tempora animi maiores culpa, natus inventore
          aspernatur eum obcaecati neque ratione nesciunt. Suscipit
          exercitationem modi similique nemo, laboriosam, inventore alias nam,
          consequatur quia voluptatibus earum autem harum hic blanditiis
          repellendus. Hic itaque repudiandae mollitia harum deleniti cumque non
          quam provident alias reiciendis, magnam, perspiciatis quas ullam quo
          minus modi recusandae ab ut quaerat magni adipisci explicabo, illum
          sint! Architecto inventore error laudantium alias eveniet, magni modi
          ipsum dignissimos! Iure corrupti deserunt cumque repellendus possimus?
          Vel eaque, nemo cum repellat excepturi quibusdam libero dolores
          perspiciatis incidunt quis vero facilis ab amet voluptates?
          Reprehenderit eligendi doloribus, autem nesciunt, nobis molestiae
          libero eius aperiam excepturi quo rerum! Aspernatur voluptate quia
          voluptatem quisquam distinctio animi vitae obcaecati delectus illo
          earum! Animi nisi delectus consequuntur?
        </p>

        <Seller />

        <div className="mt-12">
          <h2>Reviews</h2>
          {[1, 3, 4, 5, 5].map((_, index) => (
            <Review key={index} />
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="lg:col-span-1">
        <Price />
      </div>
    </div>
  );
};

const Price = () => {
  return (
    <div className="border rounded p-5 flex flex-col gap-2 md:sticky md:top-32">
      <div className="price font-bold font-poppins text-gray-600 flex justify-between mb-2.5 ">
        <h3>Full responsive website</h3>
        <span>$ 99.5</span>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
        voluptates corporis unde est nam! Et?
      </p>
      <div className="details flex items-center justify-between my-3">
        <div className="item flex gap-1 items-center">
          <MdAccessTime size={24} />
          <p className="font-semibold">2 days delivery</p>
        </div>
        <div className="item flex gap-1 items-center">
          <HiOutlineRefresh size={24} />
          <p className="font-semibold">3 Revisions</p>
        </div>
      </div>
      <div className="features">
        <div className="item flex gap-2 text-gray-500 leading-8 items-center">
          <FaCheck className="text-green-500" />
          <span>Feature 1</span>
        </div>
        <div className="item flex gap-2 text-gray-500 leading-8 items-center">
          <FaCheck className="text-green-500" />
          <span>Feature 2</span>
        </div>
        <div className="item flex gap-2 text-gray-500 leading-8 items-center">
          <FaCheck className="text-green-500" />
          <span>Feature 3</span>
        </div>
        <div className="item flex gap-2 text-gray-500 leading-8 items-center">
          <FaCheck className="text-green-500" />
          <span>Feature 4</span>
        </div>
      </div>
      <button className="w-full p-3 bg-green-500 hover:bg-green-600 transition duration-200 text-white rounded">
        Continue
      </button>
    </div>
  );
};

