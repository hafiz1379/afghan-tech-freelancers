import React from "react";
import Review from "./Review";
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import Alert from "../alert/Alert";

export default function ReviewContainer({ gigId }) {
  const {
    isPending,
    error,
    data: reviews,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest
        .get(`reviews/${gigId}`)
        .then((res) => res.data)
        .then((err) => err),
  });

  console.log(reviews);

  return (
    <div className="mt-12">
      {isPending ? (
        <Alert message="Loading..." />
      ) : error ? (
        <Alert message="Something went wrong" />
      ) : (
        <>
          <h2>Reviews</h2>

          {reviews.length ? (
            reviews.map((review) => <Review key={review._id} reviewData={review} />)
          ) : (
            <Alert message="No review has been added to this Gig." />
          )}
        </>
      )}
    </div>
  );
}
