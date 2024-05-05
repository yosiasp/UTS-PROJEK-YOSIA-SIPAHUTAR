const mpRepository = require('./marketplace-repository');

// the rest of your code
async function createMP(model, brand, category, price, stock) {
  const mp = await mpRepository.createMP(model, brand, category, price, stock);
  if (!mp) {
    throw new Error('Failed to create MP');
  }
  return true;
}

// Menampilkan semua barang baru
async function getMPs() {
  const mps = await mpRepository.getMPs();
  const result = mps.map((mp) => ({
    model: mp.model,
    brand: mp.brand,
    category: mp.category,
    price: mp.price,
    stock: mp.stock,
  }));
  return result;
}

async function getMPById(id) {
  const mp = await mpRepository.getMPById(id);
  if (!mp) {
    return null;
  }
  return {
    model: mp.model,
    brand: mp.brand,
    category: mp.category,
    price: mp.price,
    stock: mp.stock,
  };
}

async function updateMP(id, model, brand, category, price, stock) {
  const mp = await mpRepository.getMPById(id);
  if (!mp) {
    return null;
  }
  const updatedMP = await mpRepository.updateMP(
    model,
    brand,
    category,
    price,
    stock
  );
  if (!updatedMP) {
    throw new Error('Failed to update MP');
  }
  return true;
}

async function deleteMP(id) {
  const mp = await mpRepository.getMPById(id);
  if (!mp) {
    return null;
  }
  const deletedMP = await mpRepository.deleteMP(id);
  if (!deletedMP) {
    throw new Error('Failed to delete MP');
  }
  return true;
}

async function createPurchase(model, brand, quantity) {
  const purchase = await mpRepository.createPurchase(model, brand, quantity);
  if (!purchase) {
    throw new Error('Failed to create purchase');
  }
  return true;
}

async function updatePurchase(id, model, brand, quantity) {
  const purchase = await mpRepository.getPurchaseById(id);
  if (!purchase) {
    return null;
  }
  const updatedPurchase = await mpRepository.updatePurchase(
    id,
    model,
    brand,
    quantity
  );
  if (!updatedPurchase) {
    throw new Error('Failed to update purchase');
  }
  return true;
}
async function getPurchaseById(id) {
  const purchase = await mpRepository.getPurchaseById(id);
  if (!purchase) {
    return null;
  }
  return {
    model: purchase.model,
    brand: purchase.brand,
    quantity: purchase.quantity,
  };
}
module.exports = {
  createMP,
  getMPs,
  getMPById,
  updateMP,
  deleteMP,
  createPurchase,
  updatePurchase,
  getPurchaseById,
};
