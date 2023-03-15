const HttpException = require("../http.exception.js");

class Forbidden extends HttpException {
  constructor(message) {
    super(403, message);
  }
}

module.exports = Forbidden;