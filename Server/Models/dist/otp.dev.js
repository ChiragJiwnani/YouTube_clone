"use strict";

var mongoose = require("mongoose");

var OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false
  },
  mobileNumber: {
    type: String,
    required: false
  },
  otp: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    "default": false
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model("OTP", OTPSchema);
//# sourceMappingURL=otp.dev.js.map
