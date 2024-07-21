/* eslint-disable import/extensions */
import express from 'express';
import { createCategory, getAllCategories, getCategory } from '../controllers/category.controller.js';

const router = express.Router();
router.post('/', createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategory);

export default router;
