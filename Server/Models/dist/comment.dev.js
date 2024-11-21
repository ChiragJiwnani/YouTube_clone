"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var commentschema = _mongoose["default"].Schema({
  videoid: String,
  userid: String,
  commentbody: String,
  usercommented: String,
  commentedon: {
    type: Date,
    "default": Date.now
  },
  likes: {
    type: Number,
    "default": 0
  },
  dislikes: {
    type: Number,
    "default": 0
  },
  likedBy: {
    type: [String],
    "default": []
  },
  // Array of user IDs who liked
  dislikedBy: {
    type: [String],
    "default": []
  }
});

var _default = _mongoose["default"].model("Comments", commentschema);

exports["default"] = _default;
//# sourceMappingURL=comment.dev.js.map
