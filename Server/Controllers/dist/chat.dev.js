"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessagesForRoom = void 0;

var _chat = _interopRequireDefault(require("../Models/chat.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Controllers/chat.js
// Fetch all chat messages for a specific room
var getMessagesForRoom = function getMessagesForRoom(req, res) {
  var roomId, messages;
  return regeneratorRuntime.async(function getMessagesForRoom$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          roomId = req.params.roomId;
          console.log("Fetching messages for room: ".concat(roomId)); // Debugging statement

          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(_chat["default"].find({
            roomId: roomId
          }).sort({
            createdAt: 1
          }));

        case 5:
          messages = _context.sent;
          // Sort by creation date
          console.log("Found ".concat(messages.length, " messages")); // Debugging statement

          res.status(200).json(messages);
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](2);
          console.error("Error fetching messages: ".concat(_context.t0.message)); // Debugging statement

          res.status(500).json({
            message: _context.t0.message
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 10]]);
};

exports.getMessagesForRoom = getMessagesForRoom;
//# sourceMappingURL=chat.dev.js.map
