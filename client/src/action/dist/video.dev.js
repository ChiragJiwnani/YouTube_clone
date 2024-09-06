"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewvideo = exports.likevideo = exports.getallvideo = exports.uploadvideo = void 0;

var api = _interopRequireWildcard(require("../Api"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var uploadvideo = function uploadvideo(videodata) {
  return function _callee(dispatch) {
    var filedata, fileoption, _ref, data;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            filedata = videodata.filedata, fileoption = videodata.fileoption;
            console.log(filedata, fileoption);
            _context.next = 5;
            return regeneratorRuntime.awrap(api.uploadvideo(filedata, fileoption));

          case 5:
            _ref = _context.sent;
            data = _ref.data;
            dispatch({
              type: 'POST_VIDEO',
              data: data
            });
            dispatch(getallvideo());
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            dispatch({
              type: 'SET_ERROR',
              payload: _context.t0.response.data.message
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 11]]);
  };
};

exports.uploadvideo = uploadvideo;

var getallvideo = function getallvideo() {
  return function _callee2(dispatch) {
    var _ref2, data;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(api.getvideos());

          case 3:
            _ref2 = _context2.sent;
            data = _ref2.data;
            dispatch({
              type: 'FETCH_ALL_VIDEOS',
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

exports.getallvideo = getallvideo;

var likevideo = function likevideo(likedata) {
  return function _callee3(dispatch) {
    var id, Like, _ref3, data;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            id = likedata.id, Like = likedata.Like;
            console.log("likedata:", likedata);
            _context3.next = 5;
            return regeneratorRuntime.awrap(api.likevideo(id, Like));

          case 5:
            _ref3 = _context3.sent;
            data = _ref3.data;
            dispatch({
              type: "POST_LIKE",
              payload: data
            });
            dispatch(getallvideo());
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 11]]);
  };
};

exports.likevideo = likevideo;

var viewvideo = function viewvideo(viewdata) {
  return function _callee4(dispatch) {
    var id, _ref4, data;

    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = viewdata.id;
            console.log("view_id:", id);
            _context4.next = 5;
            return regeneratorRuntime.awrap(api.viewsvideo(id));

          case 5:
            _ref4 = _context4.sent;
            data = _ref4.data;
            dispatch({
              type: "POST_VIEWS",
              data: data
            });
            dispatch(getallvideo());
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 11]]);
  };
};

exports.viewvideo = viewvideo;
//# sourceMappingURL=video.dev.js.map
