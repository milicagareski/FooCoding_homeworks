const joi = require("joi");

// validator for req.body paramethers
exports.validateData = async (req, res, next) => {
  try {
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
  } catch (err) {
    console.error("Error in validateData", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// validator for ID from url
exports.validateID = async (req, res, next) => {
  try {
    const validateIdSchema = joi.object({
      id: joi.string().required().uuid(),
    });

    // error handling
    const { error, value } = validateIdSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // calling the next validator
    next();
  } catch (err) {
    console.error("Error in validateData", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
