"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var commentreducer = function commentreducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    data: null
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "POST_COMMENT":
      return _objectSpread({}, state);

    case "EDIT_COMMENT":
      return _objectSpread({}, state);

    case "FETCH_ALL_COMMENTS":
      return _objectSpread({}, state, {
        data: action.payload
      });

    case "LIKE_COMMENT":
    case "DISLIKE_COMMENT":
      return _objectSpread({}, state, {
        data: state.data.map(function (comment) {
          return comment._id === action.payload._id ? action.payload : comment;
        })
      });
    // case "LIKE_COMMENT":
    //   return { ...state, data: action?.data };
    // case "DISLIKE_COMMENT":
    //     return { ...state, data: action?.data };
    // case "LIKE_COMMENT":
    //   return {
    //     ...state,
    //     data: state.data.map((comment) =>
    //       comment._id === action.payload.id
    //         ? { ...comment, likes: action.payload.likes }
    //         : comment
    //     ),
    //   };
    // case "DISLIKE_COMMENT":
    //   return {
    //     ...state,
    //     data: state.data.map((comment) =>
    //       comment._id === action.payload.id
    //         ? { ...comment, dislikes: action.payload.dislikes }
    //         : comment
    //     ),
    //   };

    default:
      return state;
  }
};

var _default = commentreducer;
exports["default"] = _default;
//# sourceMappingURL=comment.dev.js.map
