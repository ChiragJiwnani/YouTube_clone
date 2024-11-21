"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _chat = require("../Controllers/chat.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Routes/chat.js
// Correctly import the controller function
var router = _express["default"].Router(); // Fetch all chat messages for a specific room


router.get('/getMessages/:roomId', _chat.getMessagesForRoom); // Use the controller function in the route

var _default = router;
exports["default"] = _default;
//# sourceMappingURL=chat.dev.js.map
