import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const OnCashSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/orders');
    }, 5000); 

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md px-6 py-4 bg-white shadow-lg rounded-lg text-center">
        <p className="text-xl font-bold text-green-500 mb-2">{t("Order placed successfully!")}</p>
        <p className="text-gray-700 mb-2">{t("redirectMessage")}</p>
      </div>
    </div>
  );
};

export default OnCashSuccess;
