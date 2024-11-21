"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.UPDATE_USER = exports.setcurrentuser = void 0;

var setcurrentuser = function setcurrentuser(data) {
  return {
    type: "FETCH_CURRENT_USER",
    payload: data
  };
}; // Action Types


exports.setcurrentuser = setcurrentuser;
var UPDATE_USER = "UPDATE_USER"; // Action Creators

exports.UPDATE_USER = UPDATE_USER;

var updateUser = function updateUser(updatedUser) {
  return {
    type: UPDATE_USER,
    payload: updatedUser
  };
};

exports.updateUser = updateUser;
//# sourceMappingURL=currentuser.dev.js.map
