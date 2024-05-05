const joi = require('joi');

module.exports = {
  createMP: {
    body: {
      model: joi.string().min(1).max(100).required().label('Model'),
      brand: joi.string().min(1).max(100).required().label('Brand'),
      category: joi.string().min(1).max(100).required().label('Category'),
      price: joi.number().min(0).max(1000000000).required().label('Price'),
      stock: joi.number().min(0).max(1000000000).required().label('Stock'),
    },
  },

  updateMP: {
    params: {
      id: joi.string().required().label('ID'),
    },
    body: {
      model: joi.string().min(1).max(100).required().label('Model'),
      brand: joi.string().min(1).max(100).required().label('Brand'),
      category: joi.string().min(1).max(100).required().label('Category'),
      price: joi.number().min(0).max(1000000000).required().label('Price'),
      stock: joi.number().min(0).max(1000000000).required().label('Stock'),
    },
  },

  createPurchase: {
    body: {
      model: joi.string().min(1).max(100).required().label('Model'),
      brand: joi.string().min(1).max(100).required().label('Brand'),
      quantity: joi
        .number()
        .min(1)
        .max(1000000000)
        .required()
        .label('Quantity'),
    },
  },

  updatePurchase: {
    params: {
      id: joi.string().required().label('ID'),
    },
    body: {
      model: joi.string().min(1).max(100).required().label('Model'),
      brand: joi.string().min(1).max(100).required().label('Brand'),
      quantity: joi
        .number()
        .min(1)
        .max(1000000000)
        .required()
        .label('Quantity'),
    },
  },
};
