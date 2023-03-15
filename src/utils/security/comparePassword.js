const bcryptjs = require("bcryptjs");

const comparePassword = async (password, hash) => {
  return await bcryptjs.compare(password, hash);
};

module.exports = comparePassword;