import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Featured = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  return (
    <div className="flex justify-center items-center h-[600px] bg-nav">
      <div className="flex items-center flex-col lg:flex-row text-white xl:gap-14 px-4 ">
        <div className="flex flex-col gap-4 sm:gap-6 xl:gap-8">
          <h1 className="font-poppins text-2xl sm:text-3xl font-semibold">
            {t("findService")}
          </h1>
          <div className="flex justify-between items-center rounded-md bg-white h-12">
            <div className="flex gap-2 items-center justify-center">
              <MdSearch size={32} className="pl-1 text-gray-600 w-full" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="border-none outline-none h-12 sm:text-xl text-gray-600"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button
              className="w-24 bg-main px-2 border-none cursor-pointer h-12 sm:text-xl"
              onClick={handleSubmit}
            >
              {t("search")}
            </button>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="sm:text-xl font-bold">{t("popular")}</span>
            <button className="nav-btn">{t("webDesign")}</button>
            <button className="nav-btn">{t("aiService")}</button>
            <button className="nav-btn">{t("uiux")}</button>
            <button className="nav-btn">{t("wordpress")}</button>
          </div>
        </div>
        <div>
          <img src="/images/man.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
