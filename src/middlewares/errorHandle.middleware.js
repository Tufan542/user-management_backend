const getStructuredZodError = require("../utils/zod.error.js");
const { ZodError } = require("zod");

const errorHandler = (err, req, res, next) => {
  // console.log(err);
  const status = Number(err?.status || 500);
  const message = err?.message || `Something went wrong`;

  // console.log(err);
  if (err instanceof ZodError) {
    const structuredError = getStructuredZodError(err);
    return res.status(400).json(structuredError);
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;