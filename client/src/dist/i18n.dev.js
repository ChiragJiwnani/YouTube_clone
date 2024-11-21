"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _reactI18next = require("react-i18next");

var _i18nextBrowserLanguagedetctor = _interopRequireDefault(require("i18next-browser-languagedetctor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// src/i18n.js
// src/i18n.js
_i18next["default"].use(_i18nextBrowserLanguagedetctor["default"]).use(_reactI18next.initReactI18next).init({
  debug: true,
  lng: "en",
  resources: {
    en: {
      translation: {
        greeting: "Hello, Welcome!"
      }
    },
    hi: {
      translation: {
        greeting: "नमस्ते, आपका स्वागत है!"
      }
    }
  }
});

var resources = {
  en: {
    translation: {
      comment: "Comment",
      edit: "Edit",
      "delete": "Delete",
      save: "Save",
      like: "Like",
      dislike: "Dislike",
      translate: "Translate",
      commented: "commented",
      pleaseLogin: "Please login to like/dislike the comment",
      editCommentPlaceholder: "Edit your comment...",
      commentType: "Please type your comment"
    }
  },
  es: {
    translation: {
      comment: "Comentario",
      edit: "Editar",
      "delete": "Eliminar",
      save: "Guardar",
      like: "Me gusta",
      dislike: "No me gusta",
      translate: "Traducir",
      commented: "comentado",
      pleaseLogin: "Por favor inicie sesión para dar me gusta/no me gusta",
      editCommentPlaceholder: "Edita tu comentario...",
      commentType: "Por favor, escribe tu comentario"
    }
  }
};
var _default = resources;
exports["default"] = _default;
//# sourceMappingURL=i18n.dev.js.map
