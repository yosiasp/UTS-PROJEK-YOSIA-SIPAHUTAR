const { Marketplace } = require('../../../models');

// Membuat barang baru
async function createMP(model, brand, category, price, stock) {
  return Marketplace.create({
    model,
    brand,
    category,
    price,
    stock,
  });
}

// menampilkan semua barang baru
async function getMPs() {
  return Marketplace.find({});
}

// menampilkan barang berdasarkan id
async function getMPById(id) {
  return Marketplace.findById(id);
}

// mengupdate barang
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

// menghapus barang
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
