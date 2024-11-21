import React, { useState } from "react";
import "./Comment.css";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import {
  editcomment,
  deletecomment,
  likeComment,
  dislikeComment,
} from "../../action/comment";
import axios from "axios";

const DisplayComment = ({
  cid,
  commentbody,
  userid,
  commenton,
  usercommented,
  userCity,
  likes = 0,
  dislikes = 0,
}) => {
  const [translation, setTranslation] = useState("");
  const [edit, setEdit] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [likeBtn, setLikeBtn] = useState(false);
  const [dislikeBtn, setDislikeBtn] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentuserreducer?.result);

  // Handle editing comments
  const handleEdit = (commentId, body) => {
    setEdit(true);
    setCommentBody(body);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (!commentBody.trim()) {
      alert("Type your comment");
      return;
    }
    dispatch(editcomment({ id: cid, commentbody: commentBody }));
    setCommentBody("");
    setEdit(false);
  };

  // Handle deleting comments
  const handleDelete = (id) => {
    dispatch(deletecomment(id));
  };

  // Handle liking a comment
  const handleLike = () => {
    if (!currentUser?._id) {
      alert("Please login to like the comment");
      return;
    }

    setLikeBtn(!likeBtn);
    dispatch(likeComment(cid, currentUser._id));

    if (dislikeBtn) setDislikeBtn(false); // Reset dislike if like is toggled
  };

  // Handle disliking a comment
  const handleDislike = () => {
    if (!currentUser?._id) {
      alert("Please login to dislike the comment");
      return;
    }

    setDislikeBtn(!dislikeBtn);
    dispatch(dislikeComment(cid, currentUser._id));

    if (likeBtn) setLikeBtn(false); // Reset like if dislike is toggled
  };

  const handleTranslation = async (text) => {
    try {
      const params = new URLSearchParams();
      params.append("q", text);
      params.append("source", "en"); // Assuming English as the source
      params.append("target", "es"); // Assuming Spanish as the target
      params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"); // Your API key

      const response = await axios.post(
        "https://cors-anywhere.herokuapp.com/https://libretranslate.de/translate",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "accept": "application/json",
            "x-requested-with": "XMLHttpRequest", // Needed for CORS proxy
          },
        }
      );

      setTranslation(response.data.translatedText); // Correct way to set translation
    } catch (error) {
      console.error("Translation error:", error.message);
      alert("Failed to translate the comment.");
    }
  };

  return (
    <div className="comment-container">
      {edit ? (
        <form onSubmit={handleSubmitEdit}>
          <input
            type="text"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            placeholder="Edit your comment..."
            className="comment-input-box"
          />
          <button type="submit" className="comment-save-btn">
            Save
          </button>
        </form>
      ) : (
        <p className="comment-body">{commentbody}</p>
      )}
      <p className="comment-metadata">
        - {usercommented} ({`from ${userCity}`})
        commented {moment(commenton).fromNow()}
      </p>
      {translation && (
        <p className="comment-translation">Translation: {translation}</p>
      )}
      <div className="comment-actions">
        <button onClick={handleLike} className="like-btn">
          Like ({likes})
        </button>
        <button onClick={handleDislike} className="dislike-btn">
          Dislike ({dislikes})
        </button>
        <button
          onClick={() => handleTranslation(commentbody)}
          className="translate-btn"
        >
          Translate
        </button>
      </div>
      {currentUser?._id === userid && (
        <div className="comment-edit-delete">
          <button
            onClick={() => handleEdit(cid, commentbody)}
            className="edit-btn"
          >
            Edit
          </button>
          <button onClick={() => handleDelete(cid)} className="delete-btn">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DisplayComment;
