const BadRequest = require("./errors/badRequest.js");
const Forbidden = require("./errors/forbidden.js");
const NotFound = require("./errors/notFound.js");
const Unauthorized = require("./errors/unauthorized.js");

const Errors = {
  BadRequest,
  Forbidden,
  NotFound,
  Unauthorized,
};

module.exports = Errors;