import React, { useState, useEffect } from "react";
import "./Comment.css";
import Displaycommment from "./Displaycommment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postcomment } from "../../action/comment";
import axios from "axios";

const Comment = ({ videoid }) => {
  const dispatch = useDispatch();
  const [commenttext, setcommentext] = useState("");
  const currentuser = useSelector((state) => state?.currentuserreducer);
  const commentlist = useSelector((state) => state.commentreducer);
  console.log(commentlist);
  const [userCity, setUserCity] = useState("");
  // const API_KEY = process.env.GEOLOCATION_API_KEY
  // Fetch the user's city using Geolocation API
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const API_KEY = "8c75a340455614d7181ada0acec9c6d1"; // Replace with your API key
        const response = await axios.get(`http://api.ipstack.com/check?access_key=${API_KEY}`);
        console.log("City fetched:", response.data.city);
        setUserCity(response.data.city);
      } catch (error) {
        console.error("Error fetching city:", error);
      }
    };
    fetchCity();
  }, []);

  // Validate comment (no special characters)
  const isValidComment = (comment) => /^[a-zA-Z0-9\s.,?!]+$/.test(comment);

  const handleonsubmit = (e) => {
    e.preventDefault();
    if (currentuser) {
      if (!commenttext) {
        alert("please type your comment!!");
      } else if (!isValidComment(commenttext)) {
        alert("Special characters are not allowed in comments.");
      } else {
        dispatch(
          postcomment({
            videoid: videoid,
            userid: currentuser?.result._id,
            commentbody: commenttext,
            usercommented: currentuser.result.name,
            city: userCity,
          })
        );
        setcommentext("");
      }
    } else {
      alert("Please login to comment");
    }
  };

  return (
    <>
      <form className="comments_sub_form_comments" onSubmit={handleonsubmit}>
        <input
          type="text"
          onChange={(e) => setcommentext(e.target.value)}
          placeholder="add comment..."
          value={commenttext}
          className="comment_ibox"
        />
        <input type="submit" value="add" className="comment_add_btn_comments" />
      </form>
      
      <div className="display_comment_container">
        {commentlist?.data
          .filter((q) => videoid === q?.videoid)
          .reverse()
          .map((m) => {
            return (
              <Displaycommment
                cid={m._id}
                userid={m.userid}
                commentbody={m.commentbody}
                commenton={m.commenton}
                usercommented={m.usercommented}
                city={m.city}
                likes={m.likes}
                dislikes={m.dislikes}
              />
            );
          })}
      </div>
    </>
  );
};

export default Comment;
