const validateBody = (vSchema) => async (req, res, next) => {
  // console.log(req.body);
    const validBody = await vSchema.parseAsync(req.body);
    req.body = validBody;
    next();
  };
  
  const validateParams = (vSchema) => async (req, res, next) => {
    const validParams = await vSchema.parseAsync(req.params);
    for (const key in validParams) {
      req.params[key] = validParams[key];
    }
    next();
  };
  
  const validateQueries = (vSchema) => async (req, res, next) => {
    const validQuery = await vSchema.parseAsync(req.query);
    req.query = validQuery;
    next();
  };
  
  module.exports = {
    validateBody,
    validateParams,
    validateQueries,
  };