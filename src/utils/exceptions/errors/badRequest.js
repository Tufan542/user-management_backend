const HttpException = require("../http.exception.js");

class BadRequest extends HttpException {
  constructor(message) {
    super(400, message);
  }
}

module.exports = BadRequest;