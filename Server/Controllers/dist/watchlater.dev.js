"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletewatchlater = exports.getallwatchlatervontroller = exports.watchlatercontroller = void 0;

var _watchlater = _interopRequireDefault(require("../Models/watchlater.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var watchlatercontroller = function watchlatercontroller(req, res) {
  var watchlaterdata, addtowatchlater;
  return regeneratorRuntime.async(function watchlatercontroller$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          watchlaterdata = req.body;
          addtowatchlater = new _watchlater["default"](watchlaterdata);
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(addtowatchlater.save());

        case 5:
          res.status(200).json("added to watchlater");
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](2);
          res.status(400).json(_context.t0.message);
          return _context.abrupt("return");

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 8]]);
};

exports.watchlatercontroller = watchlatercontroller;

var getallwatchlatervontroller = function getallwatchlatervontroller(req, res) {
  var files;
  return regeneratorRuntime.async(function getallwatchlatervontroller$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_watchlater["default"].find());

        case 3:
          files = _context2.sent;
          res.status(200).send(files);
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(400).json(_context2.t0.message);
          return _context2.abrupt("return");

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getallwatchlatervontroller = getallwatchlatervontroller;

var deletewatchlater = function deletewatchlater(req, res) {
  var _req$params, videoid, viewer;

  return regeneratorRuntime.async(function deletewatchlater$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$params = req.params, videoid = _req$params.videoid, viewer = _req$params.viewer;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_watchlater["default"].findOneAndDelete({
            videoid: videoid,
            viewer: viewer
          }));

        case 4:
          res.status(200).json({
            message: "removed from watch later"
          });
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](1);
          res.status(400).json(_context3.t0.message);
          return _context3.abrupt("return");

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 7]]);
};

exports.deletewatchlater = deletewatchlater;
//# sourceMappingURL=watchlater.dev.js.map
