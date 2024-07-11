import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import Alert from '../../components/alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../redux/messages/messageSlice';
import getCurrentUser from '../../utils/getCurentUser';

const Message = () => {
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
    return <Alert message="Please wait..." />;
  }
  if (hasError) {
    return <Alert message="Something went wrong." />;
  }

  return (
    <div className="message p-4 lg:p-12">
      <span className="breadcrumb">
        <Link to="/messages">Messages</Link> &gt; {oppositUser.username}
      </span>
      <div className="flex flex-col gap-4 max-w-[900px] mx-auto">
        <div
          className="p-10 max-h-[400px] overflow-y-scroll flex flex-col gap-5"
          ref={messagesContainerRef}
        >
          {messages?.map((message) => (
            <MessageItem
              key={message._id}
              message={message}
              isOwner={message.userId === currentUser._id}
            />
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        <hr className="h-0 border-b border-gray-100 mb-5" />

        <Write onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

const Write = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row items-end gap-2 justify-between">
      <textarea
        className="h-[100px] border rounded p-3 w-full flex-1"
        name="write"
        id="write"
        placeholder="write a message"
      ></textarea>
      <button
        type="submit"
        className="bg-[#1dbf73] px-4 py-1 text-white rounded border-gray-500 border"
      >
        Send
      </button>
    </form>
  );
};

const MessageItem = ({ isOwner, message }) => {
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
    return <Alert message="Please wait..." />;
  }

  console.log(user);
  return (
    <div
      className={`flex gap-[2px] sm:gap-2  flex-col sm:flex-row sm:max-w-[500px] ${
        isOwner && 'ml-auto sm:flex-row-reverse items-end sm:items-start'
      }`}
    >
      <img
        className="h-8 w-8 lg:h-12 lg:w-12 rounded-full border border-gray-500 p-[1px] object-cover"
        src={user?.img}
        alt={user?.username}
      />
      <p
        className={`text-sm md:text-base leading-6 p-5 rounded-2xl  ${
          isOwner ? 'rounded-tr-none bg-blue-200' : 'rounded-tl-none bg-gray-200'
        }`}
      >
        {message.desc}
      </p>
    </div>
  );
};

export default Message;
