const logger = require('../src/core/logger')('api');
const { Marketplace } = require('../src/models');

const model = 'Iphone 15 Pro Max';
const brand = 'Apple';
const category = 'Smartphone';
const price = 20000000;
const stock = 10;

logger.info('Creating default barang');

(async () => {
  try {
    const barangMP = await Marketplace.countDocuments({
      model,
      brand,
    });

    if (barangMP > 0) {
      throw new Error(`Barang ${model} already exists`);
    }

    await Marketplace.create({
      model,
      brand,
      category,
      price,
      stock,
    });
  } catch (e) {
    logger.error(e);
  } finally {
    process.exit(0);
  }
})();
