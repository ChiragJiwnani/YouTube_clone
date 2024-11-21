"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pointsController = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Auth = _interopRequireDefault(require("../Models/Auth.js"));

var _history = _interopRequireDefault(require("../Models/history.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pointsController = function pointsController(req, res) {
  var _id, viewer, updatedUser, newUser, user;

  return regeneratorRuntime.async(function pointsController$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _id = req.params.id;
          viewer = req.body.viewer; // Assume the Viewer ID is passed in the request body

          console.log("Request Params:", req.params); // Check video ID

          console.log("Request Body:", req.body); // Check viewer ID

          if (_mongoose["default"].Types.ObjectId.isValid(_id)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(404).send("Video Unavailable.."));

        case 6:
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(_Auth["default"].findById(viewer));

        case 9:
          user = _context.sent;

          if (user) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(404).send("User not found"));

        case 12:
          if (user.viewedVideos.some(function (videoId) {
            return videoId.equals(_id);
          })) {
            _context.next = 21;
            break;
          }

          _context.next = 15;
          return regeneratorRuntime.awrap(_Auth["default"].findByIdAndUpdate(viewer, {
            $addToSet: {
              viewedVideos: _id
            }
          }));

        case 15:
          updatedUser = _context.sent;
          _context.next = 18;
          return regeneratorRuntime.awrap(_Auth["default"].findById(viewer));

        case 18:
          newUser = _context.sent;
          _context.next = 22;
          break;

        case 21:
          newUser = user;

        case 22:
          res.status(200).json(newUser);
          _context.next = 28;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](6);
          res.status(400).json({
            error: _context.t0.message
          });

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 25]]);
};

exports.pointsController = pointsController;
//# sourceMappingURL=points.dev.js.map
