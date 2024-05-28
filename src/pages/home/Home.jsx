import React from "react";
import Featured from "../../components/featured/Featured";
import { TrustedBy } from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/Slide/Slide";
import { cards } from "../../temporary/data";
import CategoryCard from "../../components/categoryCard/CategoryCard";
import Features from "../../components/features/Features";

const Home = () => {
  return (
    <div>
      <Featured />
      <TrustedBy />
      <Slide>
        {cards.map((item) => (
          <CategoryCard item={item} key={item.id} />
        ))}
      </Slide>
      <Features />
    </div>
  );
};

export default Home;
