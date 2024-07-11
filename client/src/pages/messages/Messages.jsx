import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import newRequest from '../../utils/newRequest';
import Alert from '../../components/alert/Alert';
import getCurrentUser from '../../utils/getCurentUser';
import { useDispatch, useSelector } from 'react-redux';
import { getConversations } from '../../redux/conversations/conversationSlice';

const Messages = () => {
  const currentUser = getCurrentUser();
  const { conversations, isLoading, hasError } = useSelector((store) => store.conversations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  console.log(conversations);

  return (
    <div className="flex justify-center px-2">
      {isLoading ? (
        <Alert message="Loading..." />
      ) : hasError ? (
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
                  <th className="px-4 py-2">{currentUser.isSeller ? 'Buyer' : 'Seller'}</th>
                  <th className="px-4 py-2">Last Message</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="">
                {conversations.map((c) => (
                  <ConversationItem conversation={c} key={c._id} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

function ConversationItem({ conversation }) {
  const currentUser = getCurrentUser();
  const [oppositeUser, setOppositeUser] = useState();

  const oppositeUserId = conversation.id.replace(currentUser._id, '');

  useEffect(() => {
    const getOppositeUser = async () => {
      try {
        const res = await newRequest.get(`users/${oppositeUserId}`);
        setOppositeUser(res.data);
      } catch (error) {
        return error;
      }
    };
    getOppositeUser();
  }, [oppositeUserId]);

  if (!oppositeUser) {
    return (
      <tr>
        <td>
          <Alert message="Please wait" />
        </td>
      </tr>
    );
  }

  const handleClick = async (id) => {
    await newRequest.put(`conversations/${id}`);
  };

  return (
    <tr
      className={`${
        (currentUser.isSeller && !conversation.readBySeller) ||
        (!currentUser.isSeller && !conversation.readByBuyer)
          ? 'bg-green-100'
          : ''
      } hover:bg-gray-100 block md:table-row border-b-2`}
      key={conversation.id}
    >
      <td className="px-4 py-2  flex gap-2">
        <img
          className="h-6 w-6 rounded-full overflow-hidden"
          src={oppositeUser.img}
          alt={oppositeUser.username}
        />
        <span className="text-lg font-semibold">{oppositeUser.username}</span>
      </td>
      <td className="px-4 py-2 block md:table-cell">
        <Link
          to={`/message/${conversation.id}`}
          className="text-blue-500 hover:underline"
          onClick={() => handleClick(conversation.id)}
        >
          {conversation?.lastMessage?.substring(0, 100)}...
        </Link>
      </td>
      <td className="px-4 py-2 block md:table-cell text-nowrap">
        {moment(conversation.updatedAt).fromNow()}
      </td>
      <td className="px-4 py-2 block md:table-cell">
        {((currentUser.isSeller && !conversation.readBySeller) ||
          (!currentUser.isSeller && !conversation.readByBuyer)) && (
          <button
            className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 text-nowrap"
            onClick={() => handleClick(conversation.id)}
          >
            Mark as Read
          </button>
        )}
      </td>
    </tr>
  );
}

export default Messages;
