import React from "react";
import { Slider } from "infinite-react-carousel";
import { cards } from "../../temporary/data";
import CategoryCard from "../categoryCard/CategoryCard";

const Slide = () => {
  console.log(cards);
  return (
    <div>
      <Slider slidesToShow={5}>
        {cards.map((card) => {
          return <CategoryCard item={card} key={card.id} />;
        })}
      </Slider>
    </div>
  );
};

export default Slide;
