// Routes/chat.js
import express from 'express';
import { getMessagesForRoom } from '../Controllers/chat.js';  // Correctly import the controller function

const router = express.Router();

// Fetch all chat messages for a specific room
router.get('/getMessages/:roomId', getMessagesForRoom);  // Use the controller function in the route

export default router;
