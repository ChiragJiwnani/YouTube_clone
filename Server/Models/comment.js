import mongoose from "mongoose";

const commentschema = mongoose.Schema({
  videoid: String,
  userid: String,
  commentbody: String,
  usercommented: String,
  commentedon: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  likedBy: { type: [String], default: [] }, // Array of user IDs who liked
  dislikedBy: { type: [String], default: [] },
});

export default mongoose.model("Comments", commentschema);
