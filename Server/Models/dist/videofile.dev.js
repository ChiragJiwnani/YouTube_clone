"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videofileschema = new _mongoose["default"].Schema({
  videotitle: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  filetype: {
    type: String,
    required: true
  },
  filepath: {
    type: String,
    required: true
  },
  filesize: {
    type: String,
    required: true
  },
  videochanel: {
    type: String,
    required: true
  },
  Like: {
    type: Number,
    "default": 0
  },
  views: {
    type: Number,
    "default": 0
  },
  uploader: {
    type: String
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model("Videofiles", videofileschema);

exports["default"] = _default;
//# sourceMappingURL=videofile.dev.js.map
