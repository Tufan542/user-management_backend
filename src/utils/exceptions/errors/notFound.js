const HttpException = require("../http.exception.js");

class NotFound extends HttpException {
  constructor(message) {
    super(404, message);
  }
}

module.exports = NotFound;