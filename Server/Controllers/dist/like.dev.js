"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.likevideocontroller = void 0;

var _videofile = _interopRequireDefault(require("../Models/videofile.js"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var likevideocontroller = function likevideocontroller(req, res) {
  var _id, Like, updatelike;

  return regeneratorRuntime.async(function likevideocontroller$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _id = req.params.id;
          Like = req.body;
          console.log("likevideocontroller:", _id, {
            Like: Like
          });

          if (_mongoose["default"].Types.ObjectId.isValid(_id)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(404).send("video unavailable.."));

        case 5:
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(_videofile["default"].findByIdAndUpdate(_id, {
            $set: {
              "Like": Like
            }
          }, {
            "new": true
          }));

        case 8:
          updatelike = _context.sent;
          res.status(200).json(updatelike);
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](5);
          res.status(400).json({
            message: "An error occurred",
            error: _context.t0.message
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 12]]);
};

exports.likevideocontroller = likevideocontroller;
//# sourceMappingURL=like.dev.js.map
