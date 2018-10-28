const Joi = require('joi');

const robotSchema = {
  name: Joi.string().required().min(3).max(30),
  model: Joi.string().required().min(3).max(30),
  manufacturer: Joi.string().required().min(3).max(30),
  attack: Joi.number().required().min(1).max(1000),
  defense: Joi.number().required().min(1).max(1000)
};

const optionalRobotSchema = {
  name: Joi.string(),
  model: Joi.string(),
  manufacturer: Joi.string(),
  attack: Joi.number().min(1).max(1000),
  defense: Joi.number().min(1).max(1000)
};

exports.validate = (json) => { return Joi.validate(json, robotSchema) }
exports.optionalValidate = (json) => { return Joi.validate(json, optionalRobotSchema) }