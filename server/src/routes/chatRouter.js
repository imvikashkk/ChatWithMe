import express from 'express';
import authorization from '../middleware/authorization.js';
import ChatRoom from '../controllers/ChatRoom.js';

const chatRouter = express.Router();

chatRouter
  .get("/:recepientId", authorization, ChatRoom)

export default chatRouter