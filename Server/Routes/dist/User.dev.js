"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Auth = require("../Controllers/Auth.js");

var _channel = require("../Controllers/channel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = _express["default"].Router();

routes.post('/login', _Auth.login);
routes.patch('/update/:id', _channel.updatechaneldata);
routes.get('/getallchannel', _channel.getallchanels);
var _default = routes;
exports["default"] = _default;
//# sourceMappingURL=User.dev.js.map
