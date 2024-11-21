import * as api from "../Api";

export const editcomment = (commentdata) => async (dispatch) => {
  try {
    const { id, commentbody } = commentdata;
    console.log("commentdata:", commentdata);
    const { data } = await api.editcomment(id, commentbody);
    dispatch({ type: "EDIT_COMMENT", payload: data });
    dispatch(getallcomment());
  } catch (error) {
    console.log("Error:", error.response?.data || error.message);
  }
};

export const postcomment = (commentdata) => async (dispatch) => {
  try {
    const { data } = await api.postcomment(commentdata);
    console.log("postcomment:", data);
    dispatch({ type: "POST_COMMENT", payload: data });
    dispatch(getallcomment());
  } catch (error) {
    console.log("Error:", error.response?.data || error.message);
  }
};
export const getallcomment = () => async (dispatch) => {
  try {
    const { data } = await api.getallcomment();
    console.log(data);
    dispatch({ type: "FETCH_ALL_COMMENTS", payload: data });
  } catch (error) {
    console.log("Error:", error.response?.data || error.message);
  }
};

export const deletecomment = (id) => async (dispatch) => {
  try {
    await api.deletecomment(id);
    dispatch(getallcomment());
  } catch (error) {
    console.log("Error:", error.response?.data || error.message);
  }
};

export const likeComment = (id,userId) => async (dispatch) => {
    try {
      console.log("likeComment API called with:", { id, userId });
      const { data } = await api.likeComment(id,userId);
      dispatch({ type: "LIKE_COMMENT", payload: data });
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };
  
  export const dislikeComment = (id,userId) => async (dispatch) => {
    try {
      console.log("dislikeComment API called with:", { id, userId });
      const { data } = await api.dislikeComment(id, userId);
      dispatch({ type: "DISLIKE_COMMENT", payload: data });
    } catch (error) {
      console.error("Error disliking comment:", error);
    }
  };
  