import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

export const getAllGigs = async (req, res, next) => {
  try {
  } catch (error) {}
};


// CREATE A NEW GIG
export const createGig = async (req, res, next) => {
  try {
    if (!req.isSeller) {
      return next(createError(403, "Only sellers can create gig"));
    }

    const newGig = new Gig({
      userId: req.userId,
      ...req.body,
    });
    const savedGig = await newGig.save();

    res.status(201).json(savedGig);
  } catch (error) {
    next(error);
  }
};
export const deleteGig = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const getGig = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
