/* eslint-disable import/extensions */
import express from 'express';
import { deleteUser, getUser, getUserAllUsers, deleteAsAdmin } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();
router.delete('/admin/:id', deleteAsAdmin);
router.delete('/:id', verifyToken, deleteUser);
router.get('/:id', getUser);
router.get('/', getUserAllUsers);

export default router;
