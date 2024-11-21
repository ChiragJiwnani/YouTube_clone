import Comment from "../Models/comment.js";
import mongoose from "mongoose";

export const postcomment = async (req, res) => {
  const commentdata = req.body;
  const postcomment = new Comment(commentdata);
  try {
    await postcomment.save();
    res.status(200).json("posted the comment");
  } catch (error) {
    res.status(400).json(error.message);
    return;
  }
};

export const getcomment = async (req, res) => {
  try {
    const commentlist = await Comment.find();
    res.status(200).send(commentlist);
  } catch (error) {
    res.status(400).json(error.message);
    return;
  }
};

export const deletecomment = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Comments unavailable..");
  }
  try {
    await Comment.findByIdAndDelete(_id);
    res.status(200).json({ message: "deleted comment" });
  } catch (error) {
    res.status(400).json(error.message);
    return;
  }
};

export const editcomment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentbody } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Comments unavailable..");
  }
  try {
    const updatecomment = await Comment.findByIdAndUpdate(_id, {
      $set: { commentbody: commentbody },
    });
    res.status(200).json(updatecomment);
  } catch (error) {
    res.status(400).json(error.message);
    return;
  }
};

export const likeComment = async (req, res) => {
  const { id: _id } = req.params;
  const { userId } = req.body;

  console.log("likeCommentController:", _id, { userId });

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Invalid comment ID");
  }

  try {
    const comment = await Comment.findById(_id);

    if (!comment) {
      return res.status(404).send("Comment not found");
    }

    // Toggle like
    if (comment.likedBy.includes(userId)) {
      comment.likedBy = comment.likedBy.filter((id) => id !== userId);
      comment.likes -= 1;
    } else {
      comment.likedBy.push(userId);
      comment.likes += 1;

      // Remove dislike if present
      if (comment.dislikedBy.includes(userId)) {
        comment.dislikedBy = comment.dislikedBy.filter((id) => id !== userId);
        comment.dislikes -= 1;
      }
    }
    

    const updatedComment = await comment.save();
    res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Error liking comment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const dislikeComment = async (req, res) => {
  const { id: _id } = req.params;
  const { userId } = req.body;

  console.log("dislikeCommentController:", _id, { userId });

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Invalid comment ID");
  }

  try {
    const comment = await Comment.findById(_id);

    if (!comment) {
      return res.status(404).send("Comment not found");
    }

    // Toggle dislike
    if (comment.dislikedBy.includes(userId)) {
      comment.dislikedBy = comment.dislikedBy.filter((id) => id !== userId);
      comment.dislikes -= 1;
    } else {
      comment.dislikedBy.push(userId);
      comment.dislikes += 1;

      // Remove like if present
      if (comment.likedBy.includes(userId)) {
        comment.likedBy = comment.likedBy.filter((id) => id !== userId);
        comment.likes -= 1;
      }
    }

    // Remove the comment if it has 2 dislikes
    if (comment.dislikes >= 2) {
      await Comment.findByIdAndDelete(_id); // Delete the comment from the database
      return res.status(200).json({ message: "Comment removed after 2 likes" });
    }

    const updatedComment = await comment.save();
    res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Error disliking comment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};