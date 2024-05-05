const { Marketplace } = require('../../../models');


async function createMP(model, brand, category, price, stock) {
  return Marketplace.create({
    model,
    brand,
    category,
    price,
    stock,
  });
}


async function getMPs() {
  return Marketplace.find({});
}


async function getMPById(id) {
  return Marketplace.findById(id);
}


async function updateMP(model, brand, category, price, stock) {
  return Marketplace.updateOne(
    {
      model,
    },
    {
      $set: {
        brand,
        category,
        price,
        stock,
      },
    }
  );
}


async function deleteMP(model) {
  return Marketplace.deleteOne({ model });
}

async function createPurchase(model, brand, quantity) {
  return Marketplace.create({
    model,
    brand,
    quantity,
  });
}

async function updatePurchase(id, model, brand, quantity) {
  return Marketplace.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        model,
        brand,
        quantity,
      },
    }
  );
}

async function getPurchaseById(id) {
  return Marketplace.findById(id);
}
module.exports = {
  createMP,
  getMPs,
  getMPById,
  updateMP,
  deleteMP,
  createPurchase,
  updatePurchase,
  getPurchaseById
};
