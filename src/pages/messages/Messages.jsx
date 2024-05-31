import React from "react";
import { Link } from "react-router-dom";

const Messages = () => {

  const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.'
  return (
    <div className="flex justify-center px-2">
        <div className="md:px-8 py-12 w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Messages</h1>
          </div>
          <table className="w-full text-2xs sm:text-base">
            <tr className="h-24">
              <th className="text-left">Buyer</th>
              <th className="text-left">Last Message</th>
              <th className="text-left">Date</th>
              <th className="text-left">Action</th>
            </tr>
            <tr className="bg-green-200 border-b-2 h-24">
              <td className="px-2">John Doe</td>
              <td className="text-gray-500"><Link to="/message/123">{message.substring(0, 100)}...</Link></td>
              <td className="px-2">1 dag ago</td>
              <td className="px-2"><button className="bg-green-500 text-white p-2 cursor-pointer rounded-sm">Mark as read</button></td>
            </tr>
            <tr className=" bg-green-200 border-b-2 h-24">
              <td className="px-2">John Doe</td>
              <td className="text-gray-500"><Link to="/message/123">{message.substring(0, 100)}...</Link></td>
              <td className="px-2">1 dag ago</td>
              <td className="px-2"><button className="bg-green-500 text-white p-2 cursor-pointer rounded-sm">Mark as read</button></td>
            </tr>
            <tr className=" border-b-2 h-24">
              <td className="px-2">John Doe</td>
              <td className="text-gray-500"><Link to="/message/123">{message.substring(0, 100)}...</Link></td>
              <td className="px-2 h-24">1 dag ago</td>
             
            </tr>
            <tr className=" border-b-2 h-24">
              <td className="px-2">John Doe</td>
              <td className="text-gray-500"><Link to="/message/123">{message.substring(0, 100)}...</Link></td>
              <td className="px-2">1 dag ago</td>
              
            </tr>
          </table>
        </div>
      </div>
  );
}

export default Messages;