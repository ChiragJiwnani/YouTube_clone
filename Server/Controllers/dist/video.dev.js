"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getallvideos = exports.uploadvideo = void 0;

var _videofile = _interopRequireDefault(require("../Models/videofile.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var uploadvideo = function uploadvideo(req, res) {
  var file;
  return regeneratorRuntime.async(function uploadvideo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(!req.file || !['video/mp4'].includes(req.file.mimetype))) {
            _context.next = 3;
            break;
          }

          res.status(400).json({
            message: "Please upload a .mp4 video file only."
          });
          return _context.abrupt("return");

        case 3:
          _context.prev = 3;
          file = new _videofile["default"]({
            videotitle: req.body.title.trim() || 'Untitled',
            filename: req.file.originalname,
            filepath: req.file.path,
            filetype: req.file.mimetype,
            filesize: req.file.size,
            videochanel: req.body.chanel.trim() || 'Default Channel',
            uploader: req.body.uploader.trim() || 'Anonymous'
          });
          _context.next = 7;
          return regeneratorRuntime.awrap(file.save());

        case 7:
          res.status(201).send("File uploaded successfully");
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](3);

          if (_context.t0 instanceof mongoose.Error.ValidationError) {
            res.status(400).json({
              message: "Validation error occurred."
            });
          } else if (_context.t0.name === 'MongoError' && _context.t0.code === 11000) {
            res.status(409).json({
              message: "Duplicate key error."
            });
          } else {
            res.status(500).json({
              message: "An unexpected error occurred."
            });
          }

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 10]]);
};

exports.uploadvideo = uploadvideo;

var getallvideos = function getallvideos(req, res) {
  var files;
  return regeneratorRuntime.async(function getallvideos$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_videofile["default"].find());

        case 3:
          files = _context2.sent;
          res.status(200).send(files);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: "Failed to retrieve videos."
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getallvideos = getallvideos;
//# sourceMappingURL=video.dev.js.map
