const { _3DAY } = require("../../utils/global.js");
const jwt = require("jsonwebtoken");

const getAccessToken = (payload) => {
  const jwtSecret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: _3DAY,
  });
  return token;
};

// const getRefreshToken = (payload, refreshToken) => {
//   const jwtSecret = process.env.JWT_SECRET;
//   return jwt.sign({ ...payload, refreshToken }, jwtSecret, {
//     expiresIn: _3DAY,
//   });
// };

const attachCookies = (res, payload) => {
  const jwtAccessToken = getAccessToken(payload);
  //   const jwtRefreshToken = getRefreshToken(payload, refreshToken);

  res.cookie("access_token", jwtAccessToken, {
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: _3DAY,
  });
  //   res.cookie("refresh_token", jwtRefreshToken, {
  //     httpOnly: true,
  //     signed: true,
  //     secure: process.env.NODE_ENV === "production",
  //     maxAge: _3DAY,
  //   });
};

module.exports = attachCookies;