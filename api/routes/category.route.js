/* eslint-disable import/extensions */
import express from 'express';
import { createCategory, getAllCategories, getCategory, deleteCategory, updateCategory } from '../controllers/category.controller.js';

const router = express.Router();
router.post('/', createCategory);
router.get('/', getAllCategories);
router.put('/:id', updateCategory);
router.get('/:id', getCategory);
router.delete('/:id', deleteCategory);

export default router;
