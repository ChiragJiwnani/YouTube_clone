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
  desc: {
    type: String
  },
  joinedOn: {
    type: Date,
    "default": Date.now
  }
});

var _default = _mongoose["default"].model('User', userSchema);

exports["default"] = _default;
//# sourceMappingURL=Auth.dev.js.map
