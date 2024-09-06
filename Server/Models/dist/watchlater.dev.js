"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var watchalatervideoschema = _mongoose["default"].Schema({
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

var _default = _mongoose["default"].model("Watchlater", watchalatervideoschema);

exports["default"] = _default;
//# sourceMappingURL=watchlater.dev.js.map
