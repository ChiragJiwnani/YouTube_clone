"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Comment = require("../Controllers/Comment.js");

var _auth = _interopRequireDefault(require("../middleware/auth.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/post", _Comment.postcomment);
router.get('/get', _Comment.getcomment);
router["delete"]('/delete/:id', _Comment.deletecomment);
router.patch('/edit/:id', _Comment.editcomment);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=comment.dev.js.map
