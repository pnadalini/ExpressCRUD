const Joi = require('joi');

const robotSchema = {
  name: Joi.string().required(),
  model: Joi.string().required(),
  manufacturer: Joi.string().required(),
  attack: Joi.number().required().min(0).max(1000),
  defense: Joi.number().required().min(0).max(1000)
};

const optionalRobotSchema = {
  name: Joi.string(),
  model: Joi.string(),
  manufacturer: Joi.string(),
  attack: Joi.number().min(0).max(1000),
  defense: Joi.number().min(0).max(1000)
};

exports.validate = (json) => { return Joi.validate(json, robotSchema) }
exports.validate = (json) => { return Joi.validate(json, optionalRobotSchema) }