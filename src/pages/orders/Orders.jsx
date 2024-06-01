import React from "react";
import { RiMessage2Fill } from "react-icons/ri";

const Orders = () => {
  const currentUser = {
    id: 1,
    username: "John Doe",
    isSeller: true,
  };

  return (
    <div className="flex justify-center px-2">
      <div className="md:px-8 py-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Orders</h1>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 h-12">
              <th className="text-left p-2 border-b border-gray-300">Image</th>
              <th className="text-left p-2 border-b border-gray-300">Title</th>
              <th className="text-left p-2 border-b border-gray-300">Price</th>
              <th className="text-left p-2 border-b border-gray-300">{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
              <th className="text-left p-2 border-b border-gray-300">Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-12 hover:bg-gray-50">
              <td className="p-2 border-b border-gray-300"><img src="/images/man.png" alt="Gig" className="w-12 h-12 object-cover rounded"/></td>
              <td className="p-2 border-b border-gray-300">Gig1</td>
              <td className="p-2 border-b border-gray-300">$88</td>
              <td className="p-2 border-b border-gray-300">123</td>
              <td className="p-2 pl-7 border-b border-gray-300">
                <RiMessage2Fill className="text-blue-500 cursor-pointer hover:text-blue-700" />
              </td>
            </tr>
            <tr className="h-12 hover:bg-gray-50">
              <td className="p-2 border-b border-gray-300"><img src="/images/man.png" alt="Gig" className="w-12 h-12 object-cover rounded"/></td>
              <td className="p-2 border-b border-gray-300">Gig2</td>
              <td className="p-2 border-b border-gray-300">$88</td>
              <td className="p-2 border-b border-gray-300">123</td>
              <td className="p-2 pl-7 border-b border-gray-300">
                <RiMessage2Fill className="text-blue-500 cursor-pointer hover:text-blue-700" />
              </td>
            </tr>
            <tr className="h-12 hover:bg-gray-50">
              <td className="p-2 border-b border-gray-300"><img src="/images/man.png" alt="Gig" className="w-12 h-12 object-cover rounded"/></td>
              <td className="p-2 border-b border-gray-300">Gig3</td>
              <td className="p-2 border-b border-gray-300">$88</td>
              <td className="p-2 border-b border-gray-300">123</td>
              <td className="p-2 pl-7 border-b border-gray-300">
                <RiMessage2Fill className="text-blue-500 cursor-pointer hover:text-blue-700" />
              </td>
            </tr>
            <tr className="h-12 hover:bg-gray-50">
              <td className="p-2 border-b border-gray-300"><img src="/images/man.png" alt="Gig" className="w-12 h-12 object-cover rounded"/></td>
              <td className="p-2 border-b border-gray-300">Gig4</td>
              <td className="p-2 border-b border-gray-300">$88</td>
              <td className="p-2 border-b border-gray-300">123</td>
              <td className="p-2 pl-7 border-b border-gray-300">
                <RiMessage2Fill className="text-blue-500 cursor-pointer hover:text-blue-700" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
