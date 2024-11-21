"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _video = _interopRequireDefault(require("./Routes/video.js"));

var _User = _interopRequireDefault(require("./Routes/User.js"));

var _chat = _interopRequireDefault(require("./Routes/chat.js"));

var _path = _interopRequireDefault(require("path"));

var _comment = _interopRequireDefault(require("./Routes/comment.js"));

var _chat2 = _interopRequireDefault(require("./Models/chat.js"));

var _crypto = _interopRequireDefault(require("crypto"));

var _http = require("http");

var _socket = _interopRequireDefault(require("./socket.js"));

var _socket2 = require("socket.io");

var _child_process = require("child_process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "abcdefghijklmnopqrstuvwxzy012345"; // Must be 32 characters for aes-256

var IV_LENGTH = 16; // For AES, the IV length should be 16 bytes
// Encrypt the message

var encryptMessage = function encryptMessage(message) {
  var iv = _crypto["default"].randomBytes(IV_LENGTH);

  var cipher = _crypto["default"].createCipheriv("aes-256-ctr", Buffer.from(ENCRYPTION_KEY), iv);

  var encrypted = cipher.update(message, "utf8", "hex");
  encrypted += cipher["final"]("hex");
  return iv.toString("hex") + ":" + encrypted;
}; // Decrypt the message


var decryptMessage = function decryptMessage(encryptedMessage) {
  var _encryptedMessage$spl = encryptedMessage.split(":"),
      _encryptedMessage$spl2 = _slicedToArray(_encryptedMessage$spl, 2),
      ivHex = _encryptedMessage$spl2[0],
      encryptedText = _encryptedMessage$spl2[1]; // Separate the IV from the message


  var iv = Buffer.from(ivHex, "hex");

  var decipher = _crypto["default"].createDecipheriv("aes-256-ctr", Buffer.from(ENCRYPTION_KEY), iv);

  var decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher["final"]("utf8");
  return decrypted;
}; // Environment Variables


_dotenv["default"].config({
  path: "./.env"
}); // Express App Initialization


var app = (0, _express["default"])();
var server = (0, _http.createServer)(app);
(0, _socket["default"])(server);
app.use((0, _cors["default"])());
app.use(_express["default"].json({
  limit: "30mb",
  extended: true
}));
app.use(_express["default"].urlencoded({
  limit: "30mb",
  extended: true
}));
app.use("/uploads", _express["default"]["static"](_path["default"].join("uploads")));
app.get("/", function (req, res) {
  res.send("Your tube is working");
});
app.use(_bodyParser["default"].json());
app.use("/user", _User["default"]);
app.use("/video", _video["default"]);
app.use("/comment", _comment["default"]);
app.use("/chat", _chat["default"]); // Initialize HTTP Server

var httpServer = (0, _http.createServer)(app);
var PORT = process.env.PORT; // Initialize Socket.io

var io = new _socket2.Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    // Your frontend's URL
    methods: ["POST", "GET", "PATCH"],
    credentials: false,
    optionSuccessStatus: 200 // Set up the correct CORS for frontend access

  }
}); // Socket.io chat logic

io.on("connection", function (socket) {
  console.log("a user connected:", socket.id);
  socket.on("joinRoom", function (_ref) {
    var roomId = _ref.roomId,
        userId = _ref.userId;
    socket.join(roomId);
    console.log("".concat(userId, " joined room ").concat(roomId));
  });
  socket.on("chatMessage", function _callee(_ref2) {
    var roomId, userId, message, encryptedMessage, newMessage, decryptedMessage;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            roomId = _ref2.roomId, userId = _ref2.userId, message = _ref2.message;
            console.log("Message received from ".concat(userId, " in room ").concat(roomId, ": ").concat(message));
            encryptedMessage = encryptMessage(message);
            newMessage = new _chat2["default"]({
              roomId: roomId,
              userId: userId,
              message: encryptedMessage
            });
            _context.next = 6;
            return regeneratorRuntime.awrap(newMessage.save());

          case 6:
            // Save to database
            // Decrypt message before emitting to clients
            decryptedMessage = decryptMessage(encryptedMessage); // Emit the decrypted message to the room

            io.to(roomId).emit("message", {
              userId: userId,
              message: decryptedMessage
            });
            console.log("Message broadcasted to room: ".concat(roomId));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
}); // Proxy translation request to OpenNMT server

app.post("/translate", function _callee2(req, res) {
  var _req$body, src, tgt, command;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, src = _req$body.src, tgt = _req$body.tgt;
          command = "curl -X POST http://localhost:5000/translate -H \"Content-Type: application/json\" -d '{\"src\": \"".concat(src, "\", \"tgt\": \"").concat(tgt, "\"}'");
          (0, _child_process.exec)(command, function (error, stdout) {
            if (error) {
              res.status(500).json({
                error: "Translation failed."
              });
            } else {
              res.json(JSON.parse(stdout));
            }
          });

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.post("/api/send-email-otp", function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.post("/api/send-mobile-otp", function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // MongoDB Connection and Server Listener

var DB_URL = process.env.DB_URL;

_mongoose["default"].connect(DB_URL).then(function () {
  console.log("Mongodb Database connected");
})["catch"](function (error) {
  console.log(error);
}); // Start both HTTP and Socket.io servers


httpServer.listen(PORT, function () {
  console.log("Server running on Port ".concat(PORT));
});
//# sourceMappingURL=index.dev.js.map
