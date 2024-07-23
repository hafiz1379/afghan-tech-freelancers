import React, { useEffect, useState } from 'react';
import { RiMessage2Fill } from 'react-icons/ri';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';
import getCurrentUser from '../../utils/getCurentUser';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../redux/orders/orderSlice';
import { useTranslation } from 'react-i18next';
import { Loading } from '../../components/UtilComponents/Utils';

const Orders = () => {
  const { t, i18n } = useTranslation();
  const { orders: data, isLoading, hasError } = useSelector((store) => store.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [loading, setLoading] = useState(false);
  const isRTL = i18n.dir() === 'rtl';

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleContact = async (sellerId, buyerId) => {
    const conversationId = sellerId + buyerId;
    console.log(conversationId);
    console.log(conversationId);
    try {
      setLoading(true);
      const res = await newRequest.get(`conversations/single/${conversationId}`);
      console.log(res.data);
      navigate(`/message/${conversationId}`);
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        await newRequest.post(`conversations`, {
          id: conversationId,
          sellerId,
          buyerId,
          readBySeller: currentUser?.isSeller,
          readByBuyer: !currentUser?.isSeller,
        });

        navigate(`/message/${conversationId}`);
      }
    } finally {
      setLoading(false);
    }
  };
  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <div className='flex justify-center px-2'>
      {isLoading ? (
        t('loading')
      ) : hasError ? (
        t('error')
      ) : (
        <div className='md:px-8 py-6 w-full'>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-2xl font-bold'>{t('Orders')}</h1>
          </div>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-100 h-12'>
                <th className={`p-2 border-b border-gray-300 ${isRTL ? 'text-right' : 'text-left'}`}>{t('Image')}</th>
                <th className={`p-2 border-b border-gray-300 ${isRTL ? 'text-right' : 'text-left'}`}>{t('Title')}</th>
                <th className={`p-2 border-b border-gray-300 ${isRTL ? 'text-right' : 'text-left'}`}>{t('Price')}</th>
                <th className={`p-2 border-b border-gray-300 ${isRTL ? 'text-right' : 'text-left'}`}>{t('Contact')}</th>
                <th className={`p-2 border-b border-gray-300 ${isRTL ? 'text-right' : 'text-left'}`}>Status</th>
                <th className={`p-2 border-b border-gray-300 ${isRTL ? 'text-right' : 'text-left'}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((d) => d?.status !== 'final')
                .map((order) => (
                  <tr className='h-12 hover:bg-gray-50' key={order._id}>
                    <td className='p-2 border-b border-gray-300'>
                      <img src={order.img} alt={t('Gig')} className='w-12 h-12 object-cover rounded' />
                    </td>
                    <td className='p-2 border-b border-gray-300'>{order.title}</td>
                    <td className='p-2 border-b border-gray-300'>{order.price}</td>
                    <td className='p-2 pl-7 border-b border-gray-300'>
                      <RiMessage2Fill className='text-blue-500 cursor-pointer hover:text-blue-700' onClick={() => handleContact(order.sellerId, order.buyerId)} />
                    </td>
                    <td className='p-2 border-b border-gray-300'>{order?.status || 'Unknown'}</td>
                    <td className='p-2 border-b border-gray-300'>{order?.status || 'Unknown'}</td>
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
