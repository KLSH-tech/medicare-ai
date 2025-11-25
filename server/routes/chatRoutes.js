import express from "express";
import { createChat, deleteChat, getChat, sendMessage } from "../controllers/chatController.js";
import { protect } from "../middlewares/auth.js";

const chatRouter = express.Router();

chatRouter.get('/create', protect, createChat)
chatRouter.get('/get', protect, getChat)
chatRouter.post('/delete', protect, deleteChat)
chatRouter.post('/message', protect, sendMessage)  // ← ADD THIS LINE

export default chatRouter
