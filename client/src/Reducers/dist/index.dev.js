"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _auth = _interopRequireDefault(require("./auth"));

var _currentuser = _interopRequireDefault(require("./currentuser"));

var _chanel = _interopRequireDefault(require("./chanel"));

var _video = _interopRequireDefault(require("./video"));

var _comment = _interopRequireDefault(require("./comment"));

var _history = _interopRequireDefault(require("./history"));

var _likedvideo = _interopRequireDefault(require("./likedvideo"));

var _watchlater = _interopRequireDefault(require("./watchlater"));

var _chat = _interopRequireDefault(require("./chat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _redux.combineReducers)({
  authreducer: _auth["default"],
  currentuserreducer: _currentuser["default"],
  videoreducer: _video["default"],
  chanelreducer: _chanel["default"],
  commentreducer: _comment["default"],
  historyreducer: _history["default"],
  likedvideoreducer: _likedvideo["default"],
  watchlaterreducer: _watchlater["default"],
  chat: _chat["default"]
});

exports["default"] = _default;
//# sourceMappingURL=index.dev.js.map
