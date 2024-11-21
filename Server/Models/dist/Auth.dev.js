"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userSchema = _mongoose["default"].Schema({
  email: {
    type: String,
    require: true
  },
  name: {
    type: String
  },
  mobileNumber: {
    type: String,
    unique: true,
    required: false
  },
  desc: {
    type: String
  },
  joinedOn: {
    type: Date,
    "default": Date.now
  },
  viewedVideos: {
    type: [_mongoose["default"].Schema.Types.ObjectId],
    ref: "videoFiles",
    "default": []
  },
  // List of video IDs
  points: {
    type: Number,
    "default": 0
  }
});

var _default = _mongoose["default"].model('User', userSchema);

exports["default"] = _default;
//# sourceMappingURL=Auth.dev.js.map
