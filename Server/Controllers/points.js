import mongoose from "mongoose";
import users from "../Models/Auth.js";
import history from "../Models/history.js";

export const pointsController = async (req, res) => {
  const { id: _id } = req.params;
  const { viewer } = req.body; // Assume the Viewer ID is passed in the request body
  console.log("Request Params:", req.params); // Check video ID
  console.log("Request Body:", req.body); // Check viewer ID

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Video Unavailable..");
  }

  try {
    let updatedUser;
    let newUser;
    // Find the user and update their viewed videos list
    const user = await users.findById(viewer);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the video ID is already in the user's list of viewed videos
    if (!user.viewedVideos.some((videoId) => videoId.equals(_id))) {
      // Update the user's viewed videos list
      updatedUser = await users.findByIdAndUpdate(viewer, {
        $addToSet: { viewedVideos: _id },
      });
      newUser = await users.findById(viewer);
    } else {
      newUser = user;
    }

    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
