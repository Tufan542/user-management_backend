const HttpException = require("../http.exception.js");

class Unauthorized extends HttpException {
  constructor(message) {
    super(401, message);
  }
}

module.exports = Unauthorized;