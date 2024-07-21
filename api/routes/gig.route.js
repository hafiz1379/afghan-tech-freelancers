/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
import express from 'express';
import { getAllGigs, createGig, deleteGig, getGig, getBasedOnCategory, createGigAsAdmin } from '../controllers/gig.controller.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

router.post('/', verifyToken, createGig);
router.post('/create', createGigAsAdmin);
router.delete('/:id', verifyToken, deleteGig);
router.get('/single/:id', getGig);
router.get('/:categoryId', getBasedOnCategory);
router.get('/', getAllGigs);

export default router;
