import React from "react";
import { Link } from "react-router-dom";

const Messages = () => {
  const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.';
  
  return (
    <div className="flex justify-center px-2">
      <div className="md:px-8 py-6 w-full">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="hidden md:table-header-group">
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Buyer</th>
                <th className="px-4 py-2">Last Message</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="bg-green-100 hover:bg-gray-100 block md:table-row border-b-2">
                <td className="px-4 py-2 block md:table-cell text-nowrap">John Doe</td>
                <td className="px-4 py-2 block md:table-cell">
                  <Link to="/message/123" className="text-blue-500 hover:underline">
                    {message.substring(0, 100)}...
                  </Link>
                </td>
                <td className="px-4 py-2 block md:table-cell text-nowrap">1 day ago</td>
                <td className="px-4 py-2 block md:table-cell">
                  <button className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 text-nowrap">
                    Mark as Read
                  </button>
                </td>
              </tr>
              <tr className="bg-green-100 hover:bg-gray-100 block md:table-row border-b-2">
                <td className="px-4 py-2 block md:table-cell text-nowrap">John Doe</td>
                <td className="px-4 py-2 block md:table-cell">
                  <Link to="/message/123" className="text-blue-500 hover:underline">
                    {message.substring(0, 100)}...
                  </Link>
                </td>
                <td className="px-4 py-2 block md:table-cell text-nowrap">1 day ago</td>
                <td className="px-4 py-2 block md:table-cell">
                  <button className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 text-nowrap">
                    Mark as Read
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-100 block md:table-row border-b-2">
                <td className="px-4 py-2 block md:table-cell text-nowrap">John Doe</td>
                <td className="px-4 py-2 block md:table-cell">
                  <Link to="/message/123" className="text-blue-500 hover:underline">
                    {message.substring(0, 100)}...
                  </Link>
                </td>
                <td className="px-4 py-2 block md:table-cell text-nowrap">1 day ago</td>
              </tr>
              <tr className="hover:bg-gray-100 block md:table-row border-b-2">
                <td className="px-4 py-2 block md:table-cell text-nowrap">John Doe</td>
                <td className="px-4 py-2 block md:table-cell">
                  <Link to="/message/123" className="text-blue-500 hover:underline">
                    {message.substring(0, 100)}...
                  </Link>
                </td>
                <td className="px-4 py-2 block md:table-cell text-nowrap">1 day ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Messages;
