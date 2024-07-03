import React from "react";
import { RiMessage2Fill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;

    const conversationId = sellerId + buyerId;

    try {
      const res = await newRequest.get(`conversations/single/${conversationId}`);
      navigate(`/message/${res.data.id}`);
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        const res = await newRequest.post(`conversations`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });

        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="flex justify-center px-2">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
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
                <th className="text-left p-2 border-b border-gray-300">Contact</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr className="h-12 hover:bg-gray-50" key={order._id}>
                  <td className="p-2 border-b border-gray-300">
                    <img src={order.img} alt="Gig" className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="p-2 border-b border-gray-300">{order.title}</td>
                  <td className="p-2 border-b border-gray-300">{order.price}</td>
                  <td className="p-2 pl-7 border-b border-gray-300">
                    <RiMessage2Fill
                      className="text-blue-500 cursor-pointer hover:text-blue-700"
                      onClick={() => handleContact(order)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
