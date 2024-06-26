import React from "react";

export const TrustedBy = () => {
  return (
    <div className="bg-gray-100 py-6">
      <h3 className="text-gray-400 font-semibold text-xl text-center">
        Trusted By:
      </h3>
      <div className="flex flex-col items-center justify-center md:flex-row md:gap-4">
        <img
          className="w-24 -mb-5"
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png"
          alt=""
        />
        <img
          className="w-24 -mb-5"
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png"
          alt=""
        />
        <img
          className="w-24 -mb-5"
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png"
          alt=""
        />
        <img
          className="w-24 -mb-5"
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.6dc32e4.png"
          alt=""
        />
        <img
          className="w-24 -mb-5"
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png"
          alt=""
        />
      </div>
    </div>
  );
};
