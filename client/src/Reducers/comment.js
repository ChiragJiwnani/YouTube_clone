const commentreducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "POST_COMMENT":
      return { ...state };
    case "EDIT_COMMENT":
      return { ...state };
    case "FETCH_ALL_COMMENTS":
      return { ...state, data: action.payload };
    case "LIKE_COMMENT":
    case "DISLIKE_COMMENT":
      return {
        ...state,
        data: state.data.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        ),
      };

    // case "LIKE_COMMENT":
    //   return { ...state, data: action?.data };
    // case "DISLIKE_COMMENT":
    //     return { ...state, data: action?.data };
    // case "LIKE_COMMENT":
    //   return {
    //     ...state,
    //     data: state.data.map((comment) =>
    //       comment._id === action.payload.id
    //         ? { ...comment, likes: action.payload.likes }
    //         : comment
    //     ),
    //   };

    // case "DISLIKE_COMMENT":
    //   return {
    //     ...state,
    //     data: state.data.map((comment) =>
    //       comment._id === action.payload.id
    //         ? { ...comment, dislikes: action.payload.dislikes }
    //         : comment
    //     ),
    //   };
    default:
      return state;
  }
};
export default commentreducer;
