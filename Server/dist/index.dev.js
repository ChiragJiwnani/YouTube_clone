"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _video = _interopRequireDefault(require("./Routes/video.js"));

var _User = _interopRequireDefault(require("./Routes/User.js"));

var _path = _interopRequireDefault(require("path"));

var _comment = _interopRequireDefault(require("./Routes/comment.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config({
  path: './.env'
});

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json({
  limit: "300mb",
  extended: true
}));
app.use(_express["default"].urlencoded({
  limit: "300mb",
  extended: true
}));
app.use('/uploads', _express["default"]["static"](_path["default"].join('uploads')));
app.get('/', function (req, res) {
  res.send("Your tube is working");
});
app.use(_bodyParser["default"].json());
app.use('/user', _User["default"]);
app.use('/video', _video["default"]);
app.use('/comment', _comment["default"]);
var PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log("Server running on Port ".concat(PORT));
});
var DB_URL = process.env.DB_URL;

_mongoose["default"].connect(DB_URL).then(function () {
  console.log("Mongodb Database connected");
})["catch"](function (error) {
  console.log(error);
});
//# sourceMappingURL=index.dev.js.map
