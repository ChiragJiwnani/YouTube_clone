"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _reactI18next = require("react-i18next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// src/i18n.js
var resources = {
  en: {
    translation: {
      comment: "Comment",
      edit: "Edit",
      "delete": "Delete",
      save: "Save",
      like: "Like",
      dislike: "Dislike",
      translate: "Translate"
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
      translate: "Traducir"
    }
  } // You can add more languages here

};

_i18next["default"].use(_reactI18next.initReactI18next).init({
  resources: resources,
  lng: "en",
  // Default language
  fallbackLng: "en",
  // Use English if the language is not found
  interpolation: {
    escapeValue: false
  }
});

var _default = _i18next["default"];
exports["default"] = _default;
//# sourceMappingURL=i18n.dev.js.map
