"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _socket = require("socket.io");

var socketServer = function socketServer(server) {
  var io = new _socket.Server(server, {
    cors: {
      // origin: "http://localhost:3000",
      origin: "https://chirags-youtube-clone.netlify.app",
      methods: ["GET", "POST"]
    }
  });
  io.on("connection", function (socket) {
    console.log("New client connected: ", socket.id);
    socket.emit("yourID", socket.id);
    socket.on("callUser", function (data) {
      io.to(data.userToCall).emit("hey", {
        signal: data.signalData,
        from: data.from
      });
    });
    socket.on("acceptCall", function (data) {
      io.to(data.to).emit("callAccepted", data.signal);
    }); // Added this to handle endCall event

    socket.on("endCall", function (data) {
      io.to(data.to).emit("callEnded");
    });
    socket.on("disconnect", function () {
      console.log("Client disconnected");
    });
  });
};

var _default = socketServer;
exports["default"] = _default;
//# sourceMappingURL=socket.dev.js.map
