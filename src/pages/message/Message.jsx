import React from "react";
import { Link } from "react-router-dom";

const Message = () => {
  return (
    <div className="message p-4 lg:p-12">
      <span className="breadcrumb">
        <Link to="/messages">Messages</Link> &gt; Reza Merzaee
      </span>
      <div className="flex flex-col gap-4 max-w-[900px] mx-auto">
        <div className="p-10 max-h-[400px] overflow-y-scroll flex flex-col gap-5">
          <MessageItem isOwner={false} />
          <MessageItem isOwner={true} />
        </div>

        <hr className="h-0 border-b border-gray-100 mb-5" />

        <Write />
      </div>
    </div>
  );
};

const Write = () => {
  return (
    <div className="flex flex-col sm:flex-row items-end gap-2 justify-between">
      <textarea
        className="h-[100px] border rounded p-3 w-full flex-1"
        name="write"
        id="write"
        placeholder="write a message"
      ></textarea>
      <button className="bg-[#1dbf73] px-4 py-1 text-white rounded border-gray-500 border">
        Send
      </button>
    </div>
  );
};

const MessageItem = ({ isOwner }) => {
  return (
    <div
      className={`flex gap-[2px] sm:gap-2 justify-between flex-col sm:flex-row sm:max-w-[500px] ${
        isOwner && "ml-auto sm:flex-row-reverse items-end sm:items-start"
      }`}
    >
      <img
        className="h-8 w-8 lg:h-12 lg:w-12 rounded-full border border-gray-500 p-[1px] object-cover"
        src="https://avatars.githubusercontent.com/u/76435157?v=4"
        alt="Reza Merzaee"
      />
      <p
        className={`text-sm md:text-base leading-6 p-5 rounded-2xl  ${
          isOwner
            ? "rounded-tr-none bg-blue-200"
            : "rounded-tl-none bg-gray-200"
        }`}
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
        obcaecati nisi nobis ipsam placeat rerum non necessitatibus soluta
      </p>
    </div>
  );
};

export default Message;
