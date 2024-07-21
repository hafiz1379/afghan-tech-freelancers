/* eslint-disable import/extensions */
import Gig from '../models/gig.model.js';
import createError from '../utils/createError.js';

// GET ALL GIGS OR GET ALL BY FILTER
export const getAllGigs = async (req, res, next) => {
  try {
    const { query } = req;
    const gigs = await Gig.find(query);
    return res.status(200).json(gigs);
  } catch (error) {
    return next(createError(500, 'Something went wrong from'));
  }
};

export const createGigAsAdmin = async (req, res) => {
  await Gig.create(req.body);
  return res.status(200).send('successfully created');
};

// CREATE A NEW GIG
export const createGig = async (req, res, next) => {
  try {
    if (!req.isSeller) {
      return next(createError(403, 'Only sellers can create gig'));
    }

    const newGig = new Gig({
      userId: req.userId,
      ...req.body,
    });
    const savedGig = await newGig.save();

    return res.status(201).json({
      status: 'success',
      data: {
        gig: savedGig,
      },
    });
  } catch (error) {
    return next(error);
  }
};

// DELETE AN EXISTING GIG
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId) {
      return next(createError(403, 'You can delete only your gig'));
    }

    await Gig.findByIdAndDelete(req.params.id);
    return res.status(200).send('Gig has been deleted');
  } catch (error) {
    return next(error);
  }
};

// GET A GIG BY ID
export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, 'Gig not found'));
    return res.status(200).json(gig);
  } catch (error) {
    return next(error);
  }
};

export const getBasedOnCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const gigs = await Gig.find({ categoryId });
    return res.status(200).json({
      status: 'success',
      data: {
        gigs,
      },
    });
  } catch (error) {
    return res.status(403).json({
      status: 'error',
      message: 'Something went wrong from the getBasedOnCategory',
      error,
    });
  }
};
