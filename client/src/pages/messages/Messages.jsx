import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import newRequest from "../../utils/newRequest";
import Alert from "../../components/alert/Alert";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: conversations,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("conversations");
    },
  });

  const handleClick = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="flex justify-center px-2">
      {isLoading ? (
        <Alert message="Loading..." />
      ) : error ? (
        <Alert message="Something went wrong" />
      ) : (
        <div className="md:px-8 py-6 w-full">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">Messages</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="hidden md:table-header-group">
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                  <th className="px-4 py-2">Last Message</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="">
                {conversations.map((c) => {
                  return (
                    <tr
                      className={`${
                        (currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer) ? "bg-green-100" : ""
                      } hover:bg-gray-100 block md:table-row border-b-2`}
                      key={c.id}
                    >
                      <td className="px-4 py-2 block md:table-cell text-nowrap">{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
                      <td className="px-4 py-2 block md:table-cell">
                        <Link to={`/message/${c.id}`} className="text-blue-500 hover:underline" onClick={() => handleClick(c.id)}>
                          {c?.lastMessage?.substring(0, 100)}...
                        </Link>
                      </td>
                      <td className="px-4 py-2 block md:table-cell text-nowrap">{moment(c.updatedAt).fromNow()}</td>
                      <td className="px-4 py-2 block md:table-cell">
                        {((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer)) && (
                          <button
                            className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 text-nowrap"
                            onClick={() => handleClick(c.id)}
                          >
                            Mark as Read
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
