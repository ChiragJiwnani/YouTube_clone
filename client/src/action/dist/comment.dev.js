"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletecomment = exports.getallcomment = exports.postcomment = exports.editcomment = void 0;

var api = _interopRequireWildcard(require("../Api"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var editcomment = function editcomment(commentdata) {
  return function _callee(dispatch) {
    var id, commentbody, _ref, data;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            id = commentdata.id, commentbody = commentdata.commentbody;
            console.log("commentdata:", commentdata);
            _context.next = 5;
            return regeneratorRuntime.awrap(api.editcomment(id, commentbody));

          case 5:
            _ref = _context.sent;
            data = _ref.data;
            dispatch({
              type: "EDIT_COMMENT",
              payload: data
            });
            dispatch(getallcomment());
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 11]]);
  };
};

exports.editcomment = editcomment;

var postcomment = function postcomment(commentdata) {
  return function _callee2(dispatch) {
    var _ref2, data;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(api.postcomment(commentdata));

          case 3:
            _ref2 = _context2.sent;
            data = _ref2.data;
            dispatch({
              type: "POST_COMMENT",
              payload: data
            });
            dispatch(getallcomment());
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
};

exports.postcomment = postcomment;

var getallcomment = function getallcomment() {
  return function _callee3(dispatch) {
    var _ref3, data;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(api.getallcomment());

          case 3:
            _ref3 = _context3.sent;
            data = _ref3.data;
            // console.log(data)
            dispatch({
              type: "FETCH_ALL_COMMENTS",
              payload: data
            });
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.getallcomment = getallcomment;

var deletecomment = function deletecomment(id) {
  return function _callee4(dispatch) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap(api.deletecomment(id));

          case 3:
            dispatch(getallcomment());
            _context4.next = 9;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 6]]);
  };
};

exports.deletecomment = deletecomment;
//# sourceMappingURL=comment.dev.js.map
