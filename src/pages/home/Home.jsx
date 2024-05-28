import React from "react";
import Featured from "../../components/featured/Featured";
import { TrustedBy } from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/Slide/Slide";

const Home = () => {
  return (
    <div>
      <Featured />
      <TrustedBy />
      <Slide />
    </div>
  );
};

export default Home;
