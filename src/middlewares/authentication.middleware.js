const verifyJwtToken = require("../utils/jwt/verifyToken.js");
const Errors = require("../utils/exceptions/index.js");

const authenticate = async (req, res, next) => {
  const hasAccessToken = req.signedCookies["access_token"];
  if (!hasAccessToken)
    throw new Errors.Unauthorized("Session expired! Please re-login");
  try {
    if (hasAccessToken) {
      const jwtUser = verifyJwtToken(hasAccessToken);
      req.user = jwtUser;
      return next();
    }
    throw new Errors.Unauthorized("Authentication failed!");
  } catch (e) {
    throw new Errors.Unauthorized("Authentication failed!");
  }
};

module.exports = authenticate;