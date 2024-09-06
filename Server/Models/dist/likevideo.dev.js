"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var likedvideoschema = _mongoose["default"].Schema({
  videoid: {
    type: String,
    require: true
  },
  viewer: {
    type: String,
    require: true
  },
  likedon: {
    type: Date,
    "default": Date.now
  }
});

var _default = _mongoose["default"].model("Likedvideo", likedvideoschema);

exports["default"] = _default;
//# sourceMappingURL=likevideo.dev.js.map
