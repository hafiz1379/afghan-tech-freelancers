import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import { useTranslation } from 'react-i18next';

const OnCashPay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await newRequest.post(`/orders/create-on-cash-order/${id}`);
      setMessage(t('Order placed successfully!'));
      navigate('/orders');
    } catch (error) {
      setMessage(t('Something went wrong. Please try again.'));
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white shadow-md rounded-md"> 
      <h2 className="text-2xl font-bold mb-4">{t('On Cash Payment')}</h2>
      <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="passportPhoto">
            Passport Photo
          </label>
          <input
            type="file"
            name="passportPhoto"
            id="passportPhoto"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 px-4 bg-green-500 hover:bg-green-600 transition duration-200 text-white rounded mt-4 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? t('Placing Order...') : t('Place Order')}
        </button>
        {message && <div className="mt-2 text-sm text-red-500">{message}</div>}
      </form>
    </div>
  );
};

export default OnCashPay;
