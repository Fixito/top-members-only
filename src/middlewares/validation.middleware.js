const validator = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.body);
  req.result = result;
  next();
};

export default validator;
