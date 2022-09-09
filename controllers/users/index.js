const signup = require("./signup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updeteSubscription = require("./updeteSubscription");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const resendEmail = require("./resendEmail");

module.exports = {
  signup,
  login,
  getCurrent,
  logout,
  updeteSubscription,
  updateAvatar,
  verify,
  resendEmail,
};
