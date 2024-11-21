"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getallchanels = exports.updatechaneldata = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Auth = _interopRequireDefault(require("../Models/Auth.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var updatechaneldata = function updatechaneldata(req, res) {
  var _id, _req$body, name, desc, updatedata;

  return regeneratorRuntime.async(function updatechaneldata$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _id = req.params.id;
          _req$body = req.body, name = _req$body.name, desc = _req$body.desc;

          if (_mongoose["default"].Types.ObjectId.isValid(_id)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(404).send("Channel unavailable.."));

        case 4:
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(_Auth["default"].findByIdAndUpdate(_id, {
            $set: {
              name: name,
              desc: desc
            }
          }, {
            "new": true
          }));

        case 7:
          updatedata = _context.sent;
          res.status(200).json(updatedata);
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](4);
          res.status(405).json({
            message: _context.t0.message
          });
          return _context.abrupt("return");

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 11]]);
};

exports.updatechaneldata = updatechaneldata;

var getallchanels = function getallchanels(req, res) {
  var allchanels, allchaneldata;
  return regeneratorRuntime.async(function getallchanels$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Auth["default"].find());

        case 3:
          allchanels = _context2.sent;
          allchaneldata = [];
          allchanels.forEach(function (channel) {
            allchaneldata.push({
              _id: channel._id,
              name: channel.name,
              email: channel.email,
              desc: channel.desc
            });
          });
          res.status(200).json(allchaneldata);
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          res.status(405).json({
            message: _context2.t0.message
          });
          return _context2.abrupt("return");

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.getallchanels = getallchanels;
//# sourceMappingURL=channel.dev.js.map
