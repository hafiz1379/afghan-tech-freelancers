/* eslint-disable import/extensions */
import express from 'express';
import {
  getAllConversations,
  createConversation,
  getSingleConversation,
  updateConversation,
} from '../controllers/conversation.controller.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();
router.get('/', verifyToken, getAllConversations);
router.post('/', verifyToken, createConversation);
router.get('/single/:id', verifyToken, getSingleConversation);
router.put('/:id', verifyToken, updateConversation);

export default router;
