"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletelikedvideo = exports.getalllikedvideo = exports.addtolikedvideo = void 0;

var api = _interopRequireWildcard(require("../Api"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var addtolikedvideo = function addtolikedvideo(likedvideodata) {
  return function _callee(dispatch) {
    var _ref, data;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(api.addtolikevideo(likedvideodata));

          case 3:
            _ref = _context.sent;
            data = _ref.data;
            console.log("likedvideodata:", likedvideodata);
            dispatch({
              type: "POST_LIKEDVIDEO",
              data: data
            });
            dispatch(getalllikedvideo());
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 10]]);
  };
};

exports.addtolikedvideo = addtolikedvideo;

var getalllikedvideo = function getalllikedvideo() {
  return function _callee2(dispatch) {
    var _ref2, data;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(api.getalllikedvideo());

          case 3:
            _ref2 = _context2.sent;
            data = _ref2.data;
            dispatch({
              type: "FETCH_ALL_LIKED_VIDEOS",
              payload: data
            });
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.getalllikedvideo = getalllikedvideo;

var deletelikedvideo = function deletelikedvideo(likedvidedata) {
  return function _callee3(dispatch) {
    var videoid, viewer;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            videoid = likedvidedata.videoid, viewer = likedvidedata.viewer;
            console.log("likedvidedata:", likedvidedata);
            _context3.next = 5;
            return regeneratorRuntime.awrap(api.deletelikedvideo(videoid, viewer));

          case 5:
            dispatch(getalllikedvideo());
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

exports.deletelikedvideo = deletelikedvideo;
//# sourceMappingURL=likedvideo.dev.js.map
