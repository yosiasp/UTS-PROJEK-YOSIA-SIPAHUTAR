const mongoose = require('mongoose');
const config = require('../core/config');
const logger = require('../core/logger')('app');

const usersSchema = require('./users-schema');
const marketplaceSchema = require('./marketplace-shema')
const purchaseSchema = require('./purchase-schema');

mongoose.connect(`${config.database.connection}/${config.database.name}`, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});

const User = mongoose.model('users', mongoose.Schema(usersSchema));
const Marketplace = mongoose.model('marketplace', mongoose.Schema(marketplaceSchema));
const Purchase = mongoose.model('purchase', mongoose.Schema(purchaseSchema));

module.exports = {
  mongoose,
  User,
  Marketplace,
  Purchase
};
