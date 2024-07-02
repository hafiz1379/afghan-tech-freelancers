import React, { useEffect } from "react";
import Review from "./Review";
import newRequest from "../../utils/newRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Alert from "../alert/Alert";

export default function ReviewContainer({ gigId }) {
  const queryClient = useQueryClient();
  const {
    isPending,
    error,
    data: reviews,
    refetch,
  } = useQuery({
    queryKey: [gigId],
    queryFn: () =>
      newRequest
        .get(`reviews/${gigId}`)
        .then((res) => res.data)
        .then((err) => err),
  });

  useEffect(() => {
    refetch();
  }, [reviews]);

  console.log(reviews);

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

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
      {/* Add a review form */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Add a review</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Write your opinion"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
          <select
            name="star"
            id="star"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-green-500"
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
