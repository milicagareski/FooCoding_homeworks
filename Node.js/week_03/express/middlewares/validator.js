const joi = require("joi");

// validator for req.body paramethers
exports.validateData = (req, res, next) => {
  // define Joi schemas for data validation and ID
  const taskSchema = joi.object({
    todo: joi.string().required(),
    priority: joi.string().valid("HIGH", "MEDIUM", "LOW").required(),
    dueDate: joi.date().iso().required(),
  });

  // error handling
  const { error, value } = taskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // calling the next middleware
  next();
};

// validator for ID from url
exports.validateID = (req, res, next) => {
  const validateIdSchema = joi.object({
    id: joi.string().required(),
  });

  // error handling
  const { error, value } = validateIdSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // calling the next validator
  next();
};
