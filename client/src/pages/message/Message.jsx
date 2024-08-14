import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import newRequest from '../../utils/newRequest';
import Alert from '../../components/alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../redux/messages/messageSlice';
import { IoIosRefresh } from 'react-icons/io';
import getCurrentUser from '../../utils/getCurentUser';

const Message = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { messages, isLoading, hasError } = useSelector((store) => store.messages);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [oppositUser, setOppositeUser] = useState(null);

  const currentUser = getCurrentUser();
  const oppsitUserID = id.replace(currentUser._id, '');

  useEffect(() => {
    const fetchOppositeUser = async () => {
      try {
        const res = await newRequest.get(`users/${oppsitUserID}`);
        setOppositeUser(res.data);
      } catch (error) {
        return error;
      }
    };
    fetchOppositeUser();
  }, [id]);
  console.log(oppositUser);

  useEffect(() => {
    dispatch(getMessages(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await newRequest.post('messages', {
      conversationId: id,
      userId: currentUser._id,
      desc: e.target[0].value,
    });
    dispatch(getMessages(id));
    e.target[0].value = '';
  };

  if (isLoading || !oppositUser) {
    return <Alert message={t('pleaseWait')} />;
  }
  if (hasError) {
    return <Alert message={t('somethingWentWrong')} />;
  }

  const isRTL = i18n.language === 'fa';

  return (
    <div className={`message p-4 lg:p-12 ${isRTL ? 'text-right' : ''}`}>
      <span className='breadcrumb'>
        <Link to='/messages'>{t('messages')}</Link> &gt; {oppositUser.username}
      </span>
      <div className='flex flex-col gap-4 max-w-[900px] mx-auto'>
        <div className='p-10 max-h-[400px] overflow-y-scroll flex flex-col gap-5' ref={messagesContainerRef}>
          {messages?.map((message) => (
            <MessageItem key={message._id} message={message} isOwner={message.userId === currentUser._id} isRTL={isRTL} />
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        <hr className='h-0 border-b border-gray-100 mb-5' />

        <Write onSubmit={handleSubmit} isRTL={isRTL} />
      </div>
    </div>
  );
};

const Write = ({ onSubmit, isRTL }) => {
  const { t } = useTranslation();
  return (
    <form onSubmit={onSubmit} className={`flex flex-col sm:flex-row items-end gap-2 justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
      <textarea className='h-[100px] border rounded p-3 w-full flex-1' name='write' id='write' placeholder={t('writeMessage')}></textarea>
      <div className='flex flex-col h100 justify-between'>
        <IoIosRefresh
          className='h-7 w-7 p-1 rounded border mx-auto mb-5 hover:bg-blue-200 cursor-pointer'
          onClick={() => {
            window.location.reload();
          }}
        />
        <button type='submit' className='bg-[#1dbf73] px-4 py-1 text-white rounded border-gray-500 border'>
          {t('send')}
        </button>
      </div>
    </form>
  );
};

const MessageItem = ({ isOwner, message, isRTL }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);

  const currentUser = getCurrentUser();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (message.userId === currentUser._id) {
          setUser(currentUser);
          return;
        }
        const res = await newRequest.get(`users/${message.userId}`);
        setUser(res.data);
      } catch (error) {
        return error;
      }
    };
    fetchUser();
  }, [message]);

  if (!user) {
    return <Alert message={t('pleaseWait')} />;
  }

  console.log(user);
  return (
    <div
      className={`flex gap-[2px] sm:gap-2 flex-col sm:flex-row sm:max-w-[500px] ${isOwner ? 'ml-auto sm:flex-row-reverse items-end sm:items-start' : 'mr-auto'} ${
        isRTL ? (isOwner ? 'text-left' : 'text-right') : ''
      }`}>
      <img className='h-8 w-8 lg:h-12 lg:w-12 rounded-full border border-gray-500 p-[1px] object-cover' src={user?.img} alt={user?.username} />
      <p className={`text-sm md:text-base leading-6 p-5 rounded-2xl ${isOwner ? 'rounded-tr-none bg-blue-200' : 'rounded-tl-none bg-gray-200'}`}>{message.desc}</p>
    </div>
  );
};

export default Message;
