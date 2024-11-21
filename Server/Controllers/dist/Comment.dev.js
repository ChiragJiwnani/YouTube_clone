"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dislikeComment = exports.likeComment = exports.editcomment = exports.deletecomment = exports.getcomment = exports.postcomment = void 0;

var _comment = _interopRequireDefault(require("../Models/comment.js"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var postcomment = function postcomment(req, res) {
  var commentdata, postcomment;
  return regeneratorRuntime.async(function postcomment$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          commentdata = req.body;
          postcomment = new _comment["default"](commentdata);
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(postcomment.save());

        case 5:
          res.status(200).json("posted the comment");
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](2);
          res.status(400).json(_context.t0.message);
          return _context.abrupt("return");

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 8]]);
};

exports.postcomment = postcomment;

var getcomment = function getcomment(req, res) {
  var commentlist;
  return regeneratorRuntime.async(function getcomment$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_comment["default"].find());

        case 3:
          commentlist = _context2.sent;
          res.status(200).send(commentlist);
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(400).json(_context2.t0.message);
          return _context2.abrupt("return");

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getcomment = getcomment;

var deletecomment = function deletecomment(req, res) {
  var _id;

  return regeneratorRuntime.async(function deletecomment$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _id = req.params.id;

          if (_mongoose["default"].Types.ObjectId.isValid(_id)) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).send("Comments unavailable.."));

        case 3:
          _context3.prev = 3;
          _context3.next = 6;
          return regeneratorRuntime.awrap(_comment["default"].findByIdAndDelete(_id));

        case 6:
          res.status(200).json({
            message: "deleted comment"
          });
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](3);
          res.status(400).json(_context3.t0.message);
          return _context3.abrupt("return");

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 9]]);
};

exports.deletecomment = deletecomment;

var editcomment = function editcomment(req, res) {
  var _id, commentbody, updatecomment;

  return regeneratorRuntime.async(function editcomment$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _id = req.params.id;
          commentbody = req.body.commentbody;

          if (_mongoose["default"].Types.ObjectId.isValid(_id)) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return", res.status(400).send("Comments unavailable.."));

        case 4:
          _context4.prev = 4;
          _context4.next = 7;
          return regeneratorRuntime.awrap(_comment["default"].findByIdAndUpdate(_id, {
            $set: {
              commentbody: commentbody
            }
          }));

        case 7:
          updatecomment = _context4.sent;
          res.status(200).json(updatecomment);
          _context4.next = 15;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](4);
          res.status(400).json(_context4.t0.message);
          return _context4.abrupt("return");

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[4, 11]]);
};

exports.editcomment = editcomment;

var likeComment = function likeComment(req, res) {
  var _id, userId, comment, updatedComment;

  return regeneratorRuntime.async(function likeComment$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _id = req.params.id;
          userId = req.body.userId;
          console.log("likeCommentController:", _id, {
            userId: userId
          });

          if (_mongoose["default"].Types.ObjectId.isValid(_id)) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", res.status(404).send("Invalid comment ID"));

        case 5:
          _context5.prev = 5;
          _context5.next = 8;
          return regeneratorRuntime.awrap(_comment["default"].findById(_id));

        case 8:
          comment = _context5.sent;

          if (comment) {
            _context5.next = 11;
            break;
          }

          return _context5.abrupt("return", res.status(404).send("Comment not found"));

        case 11:
          // Toggle like
          if (comment.likedBy.includes(userId)) {
            comment.likedBy = comment.likedBy.filter(function (id) {
              return id !== userId;
            });
            comment.likes -= 1;
          } else {
            comment.likedBy.push(userId);
            comment.likes += 1; // Remove dislike if present

            if (comment.dislikedBy.includes(userId)) {
              comment.dislikedBy = comment.dislikedBy.filter(function (id) {
                return id !== userId;
              });
              comment.dislikes -= 1;
            }
          }

          _context5.next = 14;
          return regeneratorRuntime.awrap(comment.save());

        case 14:
          updatedComment = _context5.sent;
          res.status(200).json(updatedComment);
          _context5.next = 22;
          break;

        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5["catch"](5);
          console.error("Error liking comment:", _context5.t0);
          res.status(500).json({
            message: "Server error",
            error: _context5.t0.message
          });

        case 22:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[5, 18]]);
};

exports.likeComment = likeComment;

var dislikeComment = function dislikeComment(req, res) {
  var _id, userId, comment, updatedComment;

  return regeneratorRuntime.async(function dislikeComment$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _id = req.params.id;
          userId = req.body.userId;
          console.log("dislikeCommentController:", _id, {
            userId: userId
          });

          if (_mongoose["default"].Types.ObjectId.isValid(_id)) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt("return", res.status(404).send("Invalid comment ID"));

        case 5:
          _context6.prev = 5;
          _context6.next = 8;
          return regeneratorRuntime.awrap(_comment["default"].findById(_id));

        case 8:
          comment = _context6.sent;

          if (comment) {
            _context6.next = 11;
            break;
          }

          return _context6.abrupt("return", res.status(404).send("Comment not found"));

        case 11:
          // Toggle dislike
          if (comment.dislikedBy.includes(userId)) {
            comment.dislikedBy = comment.dislikedBy.filter(function (id) {
              return id !== userId;
            });
            comment.dislikes -= 1;
          } else {
            comment.dislikedBy.push(userId);
            comment.dislikes += 1; // Remove like if present

            if (comment.likedBy.includes(userId)) {
              comment.likedBy = comment.likedBy.filter(function (id) {
                return id !== userId;
              });
              comment.likes -= 1;
            }
          } // Remove the comment if it has 2 dislikes


          if (!(comment.dislikes >= 2)) {
            _context6.next = 16;
            break;
          }

          _context6.next = 15;
          return regeneratorRuntime.awrap(_comment["default"].findByIdAndDelete(_id));

        case 15:
          return _context6.abrupt("return", res.status(200).json({
            message: "Comment removed after 2 likes"
          }));

        case 16:
          _context6.next = 18;
          return regeneratorRuntime.awrap(comment.save());

        case 18:
          updatedComment = _context6.sent;
          res.status(200).json(updatedComment);
          _context6.next = 26;
          break;

        case 22:
          _context6.prev = 22;
          _context6.t0 = _context6["catch"](5);
          console.error("Error disliking comment:", _context6.t0);
          res.status(500).json({
            message: "Server error",
            error: _context6.t0.message
          });

        case 26:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[5, 22]]);
};

exports.dislikeComment = dislikeComment;
//# sourceMappingURL=Comment.dev.js.map
