const Joi = require('joi');

const productSchema = Joi.object({
  success: Joi.boolean().required(),
  message: Joi.string().optional(),
  data: Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    specialPrice: Joi.number().required(),
    categories: Joi.array().required(),
    photos: Joi.array().required(),
    visible: Joi.boolean().required(),
    additionalDetails: Joi.array().required(),
    createdAt: Joi.string().required(),
    updatedAt: Joi.string().required(),
    __v: Joi.number().required()
  }).optional() 
});

module.exports = productSchema;
