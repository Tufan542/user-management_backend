const getConditionString = (payload, separator = " AND ") => {
  const conStrArr = [];
  for (const key in payload) {
    const str = `${key} = '${payload[key]}'`;
    conStrArr.push(str);
  }
  return conStrArr.join(separator);
};

module.exports = getConditionString;