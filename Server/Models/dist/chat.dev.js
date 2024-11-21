"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var chatSchema = new _mongoose["default"].Schema({
  roomId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  message: {
    type: String,
    required: true
  },
  // This will store the encrypted message
  timestamp: {
    type: Date,
    "default": new Date()
  }
});

var _default = _mongoose["default"].model("Chat", chatSchema);

exports["default"] = _default;
//# sourceMappingURL=chat.dev.js.map
