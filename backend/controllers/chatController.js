
import asyncHandler from "express-async-handler";
import Chat from "../models/ChatRoom.js";

// @desc Send a message
// @route POST /api/chats
// @access Private
export const sendMessage = asyncHandler(async (req, res) => {
  const { receiverId, message } = req.body;

  const chat = await Chat.create({
    sender: req.user._id,
    receiver: receiverId,
    message,
  });

  res.status(201).json(chat);
});

// @desc Get chat messages between two users
// @route GET /api/chats/:userId
// @access Private
export const getChatMessages = asyncHandler(async (req, res) => {
  const messages = await Chat.find({
    $or: [
      { sender: req.user._id, receiver: req.params.userId },
      { sender: req.params.userId, receiver: req.user._id },
    ],
  });
  res.json(messages);
});
