"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchMessages = exports.deletewatchlater = exports.getallwatchlater = exports.addtowatchlater = exports.deletelikedvideo = exports.getalllikedvideo = exports.addtolikevideo = exports.deletehistory = exports.getallhistory = exports.addtohistory = exports.dislikeComment = exports.likeComment = exports.getallcomment = exports.editcomment = exports.deletecomment = exports.postcomment = exports.addPoints = exports.viewsvideo = exports.likevideo = exports.getvideos = exports.uploadvideo = exports.fetchallchannel = exports.updatechaneldata = exports.login = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const API=axios.create({baseURL:`https://youtube-clone-3ge8.onrender.com`})
var API = _axios["default"].create({
  baseURL: "http://localhost:5000"
}); // const API=axios.create({baseURL:`https://youtubeclone-server.vercel.app`})


API.interceptors.request.use(function (req) {
  if (localStorage.getItem("Profile")) {
    req.headers.Authorization = "Bearer ".concat(JSON.parse(localStorage.getItem("Profile")).token);
  }

  return req;
});

var login = function login(authdata) {
  return API.post("/user/login", authdata);
};

exports.login = login;

var updatechaneldata = function updatechaneldata(id, updatedata) {
  return API.patch("/user/update/".concat(id), updatedata);
};

exports.updatechaneldata = updatechaneldata;

var fetchallchannel = function fetchallchannel() {
  return API.get("/user/getallchannel");
};

exports.fetchallchannel = fetchallchannel;

var uploadvideo = function uploadvideo(filedata, fileoption) {
  return API.post("/video/uploadvideo", filedata, fileoption);
};

exports.uploadvideo = uploadvideo;

var getvideos = function getvideos() {
  return API.get("/video/getvideos");
};

exports.getvideos = getvideos;

var likevideo = function likevideo(id, Like) {
  return API.patch("/video/like/".concat(id), Like);
};

exports.likevideo = likevideo;

var viewsvideo = function viewsvideo(id) {
  return API.patch("/video/view/".concat(id));
};

exports.viewsvideo = viewsvideo;

var addPoints = function addPoints(id, viewer) {
  return API.patch("/video/points/".concat(id), {
    viewer: viewer
  });
};

exports.addPoints = addPoints;

var postcomment = function postcomment(commentdata) {
  return API.post("/comment/post/", commentdata);
};

exports.postcomment = postcomment;

var deletecomment = function deletecomment(id) {
  return API["delete"]("/comment/delete/".concat(id));
};

exports.deletecomment = deletecomment;

var editcomment = function editcomment(id, commentbody) {
  return API.patch("/comment/edit/".concat(id), commentbody);
};

exports.editcomment = editcomment;

var getallcomment = function getallcomment() {
  return API.get("/comment/get");
};

exports.getallcomment = getallcomment;

var likeComment = function likeComment(id, userId) {
  return API.patch("/comment/like/".concat(id), {
    userId: userId
  });
}; // PATCH method


exports.likeComment = likeComment;

var dislikeComment = function dislikeComment(id, userId) {
  return API.patch("/comment/dislike/".concat(id), {
    userId: userId
  });
}; // PATCH method


exports.dislikeComment = dislikeComment;

var addtohistory = function addtohistory(historydata) {
  return API.post("/video/history", historydata);
};

exports.addtohistory = addtohistory;

var getallhistory = function getallhistory() {
  return API.get("/video/getallhistory");
};

exports.getallhistory = getallhistory;

var deletehistory = function deletehistory(userid) {
  return API["delete"]("/video/deletehistory/".concat(userid));
};

exports.deletehistory = deletehistory;

var addtolikevideo = function addtolikevideo(likedvideodata) {
  return API.post("/video/likevideo", likedvideodata);
};

exports.addtolikevideo = addtolikevideo;

var getalllikedvideo = function getalllikedvideo() {
  return API.get("/video/getalllikevide");
};

exports.getalllikedvideo = getalllikedvideo;

var deletelikedvideo = function deletelikedvideo(videoid, viewer) {
  return API["delete"]("/video/deletelikevideo/".concat(videoid, "/").concat(viewer));
};

exports.deletelikedvideo = deletelikedvideo;

var addtowatchlater = function addtowatchlater(watchlaterdata) {
  return API.post("/video/watchlater", watchlaterdata);
};

exports.addtowatchlater = addtowatchlater;

var getallwatchlater = function getallwatchlater() {
  return API.get("/video/getallwatchlater");
};

exports.getallwatchlater = getallwatchlater;

var deletewatchlater = function deletewatchlater(videoid, viewer) {
  return API["delete"]("/video/deletewatchlater/".concat(videoid, "/").concat(viewer));
};

exports.deletewatchlater = deletewatchlater;

var fetchMessages = function fetchMessages(roomId) {
  return API.get("/chat/getMessages/".concat(roomId));
};

exports.fetchMessages = fetchMessages;
//# sourceMappingURL=index.dev.js.map
