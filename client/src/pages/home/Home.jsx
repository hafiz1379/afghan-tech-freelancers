import React from "react";
import Featured from "../../components/featured/Featured";
import Slide from "../../components/Slide/Slide";
import CategoryCard from "../../components/categoryCard/CategoryCard";
import Features from "../../components/features/Features";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Alert from "../../components/alert/Alert";

const Home = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => newRequest.get(`categories`).then((res) => res.data),
  });

  const categories = data?.data?.categories;

  return (
    <div>
      <Featured />
      <Slide>
        {isPending ? (
          <Alert message="Loading..." />
        ) : error ? (
          <Alert message="Something went wrong" />
        ) : (
          categories.map((item) => <CategoryCard item={item} key={item._id} />)
        )}
      </Slide>
      <Features />
    </div>
  );
};

export default Home;
