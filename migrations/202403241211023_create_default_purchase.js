const logger = require('../src/core/logger')('api');
const { Purchase } = require('../src/models');

const model = 'Iphone 15 Pro Max';
const brand = 'Apple';
const quantity = 2;

logger.info('Creating default Purchase');

(async () => {
  try {
    const purchaseMp = await Purchase.countDocuments({
      model,
      brand,
    });

    if (purchaseMp > 0) {
      throw new Error(`Barang ${model} already exists`);
    }

    await Purchase.create({
      model,
      brand,
      quantity,
    });
  } catch (e) {
    logger.error(e);
  } finally {
    process.exit(0);
  }
})();