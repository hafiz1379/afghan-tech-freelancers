import React from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { HiOutlineRefresh, HiStar } from "react-icons/hi";
import { MdAccessTime } from "react-icons/md";

const Gig = () => {
  return (
    <div className="grid lg:grid-cols-3 px-4 md:px-10 sm:p-6 md:mt-6 lg:gap-8 relative">
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

const Review = () => {
  return (
    <div className="flex flex-col gap-3 mb-10">
      <div className="flex items-center gap-4">
        <img
          className="w-16 h-16 rounded-full"
          src="https://avatars.githubusercontent.com/u/76435157?v=4"
          alt="Reza Merzaee"
        />
        <div className="flex flex-col gap-1 text-gray-500">
          <h4>Reza Merzaee</h4>
          <div className="flex items-center gap-1">
            <img
              className="h-5"
              src="data:image/png;base64,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"
              alt="Afghanistan"
            />
            <span>Country</span>
          </div>
        </div>
      </div>
      <Stars />
      <p className="mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
        officia minima rem quisquam adipisci molestias esse aspernatur natus
        ratione quos itaque ipsam, molestiae a nesciunt explicabo aperiam
        officiis tenetur obcaecati veniam nemo aliquid impedit sequi cumque?
        Labore dolor perferendis sed nisi eveniet, inventore quia in autem
        repellendus reiciendis eum maiores.
      </p>
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
};
const Stars = () => {
  return (
    <div className="flex gap-[1px] items-center text-gray-500">
      {Array.from({ length: 5 }, (v, i) => i).map((value) => (
        <HiStar key={value} size={28} className="text-orange-300" />
      ))}

      <span className="inline-block ml-2 font-bold text-lg">5</span>
    </div>
  );
};

const Seller = () => {
  return (
    <div className="mt-10 flex flex-col text-gray-600">
      <h2>About the seller</h2>
      <div className="flex items-center gap-8">
        <img
          className="max-w-24 max-h-24 rounded-full object-cover"
          src="https://avatars.githubusercontent.com/u/117447018?v=4"
          alt=""
        />

        <div className="flex flex-col gap-1 items-start">
          <span className="font-semibold text-xl text-gray-700">
            Hafizullah Rasa
          </span>
          <Stars />
          <button className="bg-white rounded-md border-gray-400 border py-1 px-5 font-semibold">
            Contact Me
          </button>
        </div>
      </div>
      <div className="border-gray-400 border p-6 rounded-sm mt-6">
        <div className="grid md:grid-cols-2 gap-4 font-semibold">
          <div className="md:col-span-1">
            <div className="flex flex-wrap justify-start gap-4 my-3">
              <span className="title">From</span>
              <span className="description">Afghanistan</span>
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
        <hr className="my-2" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius facere
          alias odit earum ad. Animi quas sit dolorem iure nesciunt!
        </p>
      </div>
    </div>
  );
};

export default Gig;
