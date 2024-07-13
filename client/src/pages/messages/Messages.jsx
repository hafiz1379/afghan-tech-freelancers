import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import newRequest from '../../utils/newRequest';
import Alert from '../../components/alert/Alert';
import getCurrentUser from '../../utils/getCurentUser';
import { useDispatch, useSelector } from 'react-redux';
import { getConversations } from '../../redux/conversations/conversationSlice';
import { useTranslation } from 'react-i18next';

const Messages = () => {
  const { t } = useTranslation();
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
        <Alert message={t('loading')} />
      ) : hasError ? (
        <Alert message={t('somethingWentWrong')} />
      ) : (
        <div className="md:px-8 py-6 w-full">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">{t('messages')}</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="hidden md:table-header-group">
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">{currentUser.isSeller ? t('buyer') : t('seller')}</th>
                  <th className="px-4 py-2">{t('lastMessage')}</th>
                  <th className="px-4 py-2">{t('date')}</th>
                  <th className="px-4 py-2">{t('action')}</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {Array.isArray(conversations) ? (
                  conversations.map((c) => (
                    <ConversationItem conversation={c} key={c._id} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">
                      <Alert message={t('noConversationsFound')} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

function ConversationItem({ conversation }) {
  const { t } = useTranslation();
  const currentUser = getCurrentUser();
  const [oppositeUser, setOppositeUser] = useState();
  const [isRead, setIsRead] = useState(
    currentUser.isSeller ? conversation.readBySeller : conversation.readByBuyer
  );

  const oppositeUserId = conversation.id.replace(currentUser._id, '');

  useEffect(() => {
    const getOppositeUser = async () => {
      try {
        const res = await newRequest.get(`users/${oppositeUserId}`);
        setOppositeUser(res.data);
      } catch (error) {
        console.error('Error fetching opposite user:', error);
      }
    };
    getOppositeUser();
  }, [oppositeUserId]);

  const handleClick = async (id) => {
    try {
      await newRequest.put(`conversations/${id}`);
      setIsRead(true);
      console.log('Marked as read');
    } catch (error) {
      console.error('Error marking conversation as read:', error);
    }
  };

  if (!oppositeUser) {
    return (
      <tr>
        <td>
          <Alert message={t('pleaseWait')} />
        </td>
      </tr>
    );
  }

  return (
    <tr
      className={`${
        (!isRead) ? 'bg-green-100' : ''
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
        {(!isRead) && (
          <button
            className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 text-nowrap"
            onClick={() => handleClick(conversation.id)}
          >
            {t('markAsRead')}
          </button>
        )}
      </td>
    </tr>
  );
}

export default Messages;
