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
