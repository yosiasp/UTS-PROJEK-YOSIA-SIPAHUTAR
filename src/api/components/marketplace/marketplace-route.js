const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const marketplaceControllers = require('./marketplace-controller');
const marketplaceValidator = require('./marketplace-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/marketplace', route);

  route.get('/', authenticationMiddleware, marketplaceControllers.getMPs);

  route.post(
    '/',
    authenticationMiddleware,
    celebrate(marketplaceValidator.createMP),
    marketplaceControllers.createMP
  );

  // Add this route for creating a purchase
  route.post(
    '/purchase',
    authenticationMiddleware,
    celebrate(marketplaceValidator.createPurchase),
    marketplaceControllers.createPurchase
  );

  route.put(
    '/purchase/:id',
    authenticationMiddleware,
    celebrate(marketplaceValidator.updatePurchase),
    marketplaceControllers.updatePurchase
  );

  route.get('/:id', authenticationMiddleware, marketplaceControllers.getMPById);

  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(marketplaceValidator.updateMP),
    marketplaceControllers.updateMP
  );

  route.delete(
    '/:id',
    authenticationMiddleware,
    marketplaceControllers.deleteMP
  );
};
