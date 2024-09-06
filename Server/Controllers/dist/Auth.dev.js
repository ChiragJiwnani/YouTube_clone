"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Auth = _interopRequireDefault(require("../Models/Auth.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var login = function login(req, res) {
  var email, existingUser, newUser, token, _token;

  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          email = req.body.email;
          console.log(email);
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(_Auth["default"].findOne({
            email: email
          }));

        case 5:
          existingUser = _context.sent;
          console.log(existingUser);

          if (existingUser) {
            _context.next = 22;
            break;
          }

          _context.prev = 8;
          _context.next = 11;
          return regeneratorRuntime.awrap(_Auth["default"].create({
            email: email
          }));

        case 11:
          newUser = _context.sent;
          token = _jsonwebtoken["default"].sign({
            email: newUser.email,
            id: newUser._id
          }, process.env.JWT_SECRET, {
            expiresIn: "1h"
          });
          res.status(200).json({
            result: newUser,
            token: token
          });
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](8);
          res.status(500).json({
            mess: "something went wrong...."
          });
          return _context.abrupt("return");

        case 20:
          _context.next = 24;
          break;

        case 22:
          _token = _jsonwebtoken["default"].sign({
            email: existingUser.email,
            id: existingUser._id
          }, process.env.JWT_SECRET, {
            expiresIn: "1h"
          });
          res.status(200).json({
            result: existingUser,
            token: _token
          });

        case 24:
          _context.next = 30;
          break;

        case 26:
          _context.prev = 26;
          _context.t1 = _context["catch"](2);
          res.status(500).json({
            mess: 'something went wrong....'
          });
          return _context.abrupt("return");

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 26], [8, 16]]);
};

exports.login = login;
//# sourceMappingURL=Auth.dev.js.map
