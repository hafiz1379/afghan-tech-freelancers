/* eslint-disable import/extensions */
import express from 'express';
import { verifyToken } from '../middleware/jwt.js';
import { createCategory, getAllCategories } from '../controllers/category.controller.js';

const router = express.Router();
router.post('/', verifyToken, createCategory);
router.get('/', getAllCategories);

export default router;
