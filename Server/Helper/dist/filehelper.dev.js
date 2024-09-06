"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var storage = _multer["default"].diskStorage({
  destination: function destination(req, res, cb) {
    cb(null, "uploads");
  },
  filename: function filename(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
  }
});

var filefilter = function filefilter(req, file, cb) {
  if (file.mimetype === "video/mp4") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = (0, _multer["default"])({
  storage: storage,
  fileFilter: filefilter
});
var _default = upload;
exports["default"] = _default;
//# sourceMappingURL=filehelper.dev.js.map
