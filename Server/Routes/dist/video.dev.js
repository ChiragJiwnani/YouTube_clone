"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _like = require("../Controllers/like.js");

var _views = require("../Controllers/views.js");

var _video = require("../Controllers/video.js");

var _History = require("../Controllers/History.js");

var _watchlater = require("../Controllers/watchlater.js");

var _likedvideo = require("../Controllers/likedvideo.js");

var _filehelper = _interopRequireDefault(require("../Helper/filehelper.js"));

var _auth = _interopRequireDefault(require("../middleware/auth.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = _express["default"].Router();

routes.post("/uploadvideo", _filehelper["default"].single("file"), _video.uploadvideo);
routes.get("/getvideos", _video.getallvideos);
routes.patch('/like/:id', _like.likevideocontroller);
routes.patch('/view/:id', _views.viewscontroller);
routes.post('/history', _History.historycontroller);
routes.get('/getallhistory', _History.getallhistorycontroller);
routes["delete"]('/deletehistory/:userid', _History.deletehistory);
routes.post('/watchlater', _watchlater.watchlatercontroller);
routes.get('/getallwatchlater', _watchlater.getallwatchlatervontroller);
routes["delete"]('/deletewatchlater/:videoid/:viewer', _auth["default"], _watchlater.deletewatchlater);
routes.post('/likevideo', _likedvideo.likedvideocontroller);
routes.get('/getalllikevide', _likedvideo.getalllikedvideo);
routes["delete"]('/deletelikevideo/:videoid/:viewer', _auth["default"], _likedvideo.deletelikedvideo);
var _default = routes;
exports["default"] = _default;
//# sourceMappingURL=video.dev.js.map
