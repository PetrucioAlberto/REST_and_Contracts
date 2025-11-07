const Joi = require('joi');

const categoryData = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  photo: Joi.string().required(),
  createdAt: Joi.string().required(),
  updatedAt: Joi.string().required(),
  __v: Joi.number().optional(),
});

const categorySchema = Joi.object({
  success: Joi.boolean().required(),
  message: Joi.string().optional(), 
  data: categoryData.optional(), 
});

module.exports = categorySchema;
