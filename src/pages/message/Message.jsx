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

