import createError from "../utils/createError.js";
import Review from "./../models/review.model.js";
import Gig from "./../models/gig.model.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller) return next(createError(403, "Sellers can't create reviews"));
  const newReview = new Review({
    gigId: req.body.gigId,
    userId: req.userId,
    star: req.body.star,
    desc: req.body.desc,
  });

  try {
    const review = await Review.findOne({ gigId: req.body.gigId, userId: req.userId });
    if (review) {
      return next(createError(403, "You have already created a review"));
    }

    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(req.body.gigId, { $inc: { totalStars: req.body.star, starNumber: 1 } });
    res.status(201).json(savedReview);
  } catch (error) {
    return next(createError(error));
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(reviews);
  } catch (error) {
    return next(createError(404, error));
  }
};

export const deleteReview = async (req, res, next) => {
  try {
  } catch (error) {
    return next(createError(error));
  }
};
