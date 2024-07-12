import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { useTranslation } from "react-i18next";

const Success = () => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md px-6 py-4 bg-white shadow-lg rounded-lg text-center">
        <p className="text-xl font-bold text-green-500 mb-2">{t("paymentSuccess")}</p>
        <p className="text-gray-700 mb-2">{t("redirectMessage")}</p>
      </div>
    </div>
  );
};

export default Success;
