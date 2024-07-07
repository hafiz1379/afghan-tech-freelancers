/* eslint-disable import/extensions */
import Category from '../models/category.model.js';

export const createCategory = async (req, res) => {
  const { title, desc, img } = req.body;
  const arr = [title, desc, img];
  const names = ['title', 'Descriptions', 'Cover Photo'];
  const result = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (!arr[i]) result.push(names[i]);
  }
  const message = result.join(' ');
  if (result.length !== 0) {
    return res.status(403).json({
      status: 'fail',
      message: `The fields "${message}" should not be empty`,
    });
  }

  try {
    const category = await Category.create(req.body);
    return res.status(201).json({
      status: 'success',
      category,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      error,
    });
  }
};

// GET ALL THE CATEGORIES
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({
      status: 'success',
      result: categories.length,
      data: {
        categories,
      },
    });
  } catch (error) {
    return res.status(403).json({
      status: 'fail',
      message: 'someghing went wrong',
    });
  }
};
