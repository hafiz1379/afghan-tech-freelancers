import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Review from './Review';
import newRequest from '../../utils/newRequest';
import Alert from '../alert/Alert';
import { getReviews } from '../../redux/reviews/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';
import getCurrentUser from '../../utils/getCurentUser';

export default function ReviewContainer({ gigId, showAddReview }) {
  const { reviews, isLoading, hasError } = useSelector((store) => store.reviews);
  const dispatch = useDispatch();
  const currentUser = getCurrentUser();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchReviews = async () => {
      dispatch(getReviews(gigId));
    };
    fetchReviews();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;

    await newRequest.post('reviews', { gigId, desc, star, userId: currentUser._id });
  };

  const showForm = !reviews.find((r) => r.userId === currentUser?._id) && showAddReview;

  if (isLoading) {
    return <Alert message={t('pleaseWait')} />;
  }
  if (hasError) {
    return <Alert message={t('somethingWentWrong')} />;
  }
  console.log(reviews);

  return (
    <div className="mt-12">
      <h2>{t('reviews')}</h2>

      {reviews.length ? (
        reviews.map((review) => <Review key={review._id} reviewData={review} />)
      ) : (
        <Alert message={t('noReviews')} />
      )}

      {showForm && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">{t('addReview')}</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder={t('writeOpinion')}
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
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
            >
              {t('send')}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
