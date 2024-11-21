// Controllers/chat.js
import Chat from "../Models/chat.js";

// Fetch all chat messages for a specific room
export const getMessagesForRoom = async (req, res) => {
    const { roomId } = req.params;
    console.log(`Fetching messages for room: ${roomId}`);  // Debugging statement

    try {
        const messages = await Chat.find({ roomId }).sort({ createdAt: 1 }); // Sort by creation date
        console.log(`Found ${messages.length} messages`);  // Debugging statement
        res.status(200).json(messages);
    } catch (error) {
        console.error(`Error fetching messages: ${error.message}`);  // Debugging statement
        res.status(500).json({ message: error.message });
    }
};
