const barangservice = require('./marketplace-services');
const errorTypes = require('../../../core/errors');
const { update } = require('lodash');

async function createMP(request, response, next) {
  try {
    const model = request.body.model;
    const brand = request.body.brand;
    const category = request.body.category;
    const price = request.body.price;
    const stock = request.body.stock;

    const result = await barangservice.createMP(
      model,
      brand,
      category,
      price,
      stock
    );

    if (!result) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create new item'
      );
    }

    return response.status(200).json({ message: 'Item has been created' });
  } catch (error) {
    return next(error);
  }
}

async function getMPs(request, response, next) {
  try {
    const result = await barangservice.getMPs();
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getMPById(request, response, next) {
  try {
    const id = request.params.id;
    const result = await barangservice.getMPById(id);

    if (!result) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Item not found');
    }

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function updateMP(request, response, next) {
  try {
    const id = request.params.id;
    const brand = request.body.brand;
    const category = request.body.category;
    const price = request.body.price;
    const stock = request.body.stock;

    const result = await barangservice.updateMP(
      id,
      brand,
      category,
      price,
      stock
    );

    if (!result) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update item'
      );
    }

    return response.status(200).json({ message: 'Item has been updated' });
  } catch (error) {
    return next(error);
  }
}

async function deleteMP(request, response, next) {
  try {
    const id = request.params.id;

    const result = await barangservice.deleteMP(id);

    if (!result) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete item'
      );
    }

    return response.status(200).json({ message: 'Item has been deleted' });
  } catch (error) {
    return next(error);
  }
}

async function createPurchase(request, response, next) {
  try {
    const model = request.body.model;
    const brand = request.body.brand;
    const quantity = request.body.quantity;

    const result = await barangservice.createPurchase(model, brand, quantity);

    if (!result) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create purchase'
      );
    }

    return response.status(200).json({ message: 'Purchase has been created' });
  } catch (error) {
    return next(error);
  }
}

async function updatePurchase(request, response, next) {
  try {
    const id = request.params.id;
    const model = request.body.model;
    const brand = request.body.brand;
    const quantity = request.body.quantity;

    const result = await barangservice.updatePurchase(id, model, brand, quantity);

    if (!result) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update purchase'
      );
    }

    return response.status(200).json({ message: 'Purchase has been updated' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createMP,
  getMPs,
  getMPById,
  updateMP,
  deleteMP,
  createPurchase,
  updatePurchase,
};
