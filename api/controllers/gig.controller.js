import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

// GET ALL GIGS OR GET ALL BY FILTER
export const getAllGigs = async (req, res, next) => {
  try {
    const q = req.query;

    const filters = {
      ...(q.cat && { cat: q.cat }),
      ...((q.min || q.max) && {
        price: { ...(q.min && { $gt: q.min }), ...(q.max && { $ls: q.max }) },
      }),
      ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    };
    const gigs = await Gig.find(filters);
    res.status(200).json(gigs);
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

// DELETE AN EXISTING GIG
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId) {
      return next(createError(403, "You can delete only your gig"));
    }

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted");
  } catch (error) {
    next(error);
  }
};

// GET A GIG BY ID
export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found"));
    res.status(200).json(gig);
  } catch (error) {
    next(error);
  }
};
