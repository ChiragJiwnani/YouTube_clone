import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    roomId: { type: String, required: true },
    userId: { type: String, required: true },
    name: {type:String},
    message: { type: String, required: true },  // This will store the encrypted message
    timestamp: { type: Date, default: new Date() },
});

export default mongoose.model("Chat", chatSchema)