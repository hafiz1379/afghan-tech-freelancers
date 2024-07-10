import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { features } from "../../temporary/data";

function Features() {
  const { t } = useTranslation();

  return (
    <div className="py-5 md:py-10 bg-green-100 bg-opacity-40">
      <h2 className="text-lg md:text-3xl font-bold text-center my-6 font-poppins text-gray-700">
        {t("bestPlace")}
      </h2>
      {/* Grid Container */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 items-center md:items-start lg:items-center">
        <div className="md:col-span-1 px-2 lg:col-span-3 sm:px-6 lg:px-10 mb-8 lg:mb-0">
          {features.map((feature, index) => (
            <FeatureItem
              title={t(`features.${index}.title`)}
              description={t(`features.${index}.desc`)}
              key={index}
            />
          ))}
        </div>
        <div className="md:col-span-1 lg:col-span-2 px-2 sm:px-6 lg:px-10">
          <div className="rounded md:rounded-xl overflow-hidden">
            <img src="/images/developer.jpg" alt="Developer" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

const FeatureItem = ({ title, description }) => {
  return (
    <div className="flex items-start justify-center flex-col mb-4">
      <div className="flex items-center gap-1 mb-1">
        <FaRegCheckCircle className="text-green-600" size={24} />
        <h3 className="text-xl font-semibold text-gray-600">{title}</h3>
      </div>
      <p className="text-sm md:text-base text-gray-500">{description}</p>
    </div>
  );
};

export default Features;
