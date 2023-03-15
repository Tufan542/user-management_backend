const bcryptjs = require("bcryptjs");

const encryptPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

module.exports = encryptPassword;