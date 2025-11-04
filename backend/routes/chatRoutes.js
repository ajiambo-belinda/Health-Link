import express from 'express';
import {
  accessChat,
  fetchChats,
  sendMessage,
} from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, accessChat); // create or get chat
router.get('/', protect, fetchChats); // fetch user chats
router.post('/message', protect, sendMessage); // send message

export default router;
