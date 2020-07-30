const transactionModel = require('../models/transactionModel');

const getAll = async (req, res, next) => {
  let data;
  try {
    data = await transactionModel.getAll();
    res.send(data);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getTransactionById = async (req, res, next) => {
  let data;
  try {
    data = await transactionModel.getTransactionById(req.params.id);
    res.send(data);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const createTransaction = async (transaction) => {
  console.log(transaction);
  await transactionModel.createTransaction({
    ...transaction,
    userID: transaction.user.userID,
    productID: transaction.product.productID,
  });
};

const addNewProductTransaction = async (user, product, date, quantity) => {
  await createTransaction({
    user,
    product,
    date,
    quantity,
    startLocation: 'none',
    endLocation: 'inventory',
  });
};

const addPurchaseTransaction = async (user, product, date, quantity) => {
  await createTransaction({
    user,
    product,
    date,
    quantity,
    startLocation: 'supplier',
    endLocation: 'inventory',
  });
};

const addStockTransaction = async (user, product, date, quantity) => {
  await createTransaction({
    user,
    product,
    date,
    quantity,
    startLocation: 'inventory',
    endLocation: 'shelf',
  });
};

const addSellTransaction = async (user, product, date, quantity) => {
  await createTransaction({
    user,
    product,
    date,
    quantity,
    startLocation: 'shelf',
    endLocation: 'sold',
  });
};

const addReturnToShelfTransaction = async (user, product, date, quantity) => {
  await createTransaction({
    user,
    product,
    date,
    quantity,
    startLocation: 'sold',
    endLocation: 'shelf',
  });
};

const addReturnToInventoryTransaction = async (
  user,
  product,
  date,
  quantity,
) => {
  await createTransaction({
    user,
    product,
    date,
    quantity,
    startLocation: 'sold',
    endLocation: 'inventory',
  });
};

const addDiscardFromShelfTransaction = async (
  user,
  product,
  date,
  quantity,
) => {
  await createTransaction({
    user,
    product,
    date,
    quantity,
    startLocation: 'shelf',
    endLocation: 'garbage',
  });
};

const addDiscardFromInventoryTransaction = async (
  user,
  product,
  date,
  quantity,
) => {
  await createTransaction({
    user,
    product,
    date,
    quantity,
    startLocation: 'shelf',
    endLocation: 'garbage',
  });
};

module.exports = {
  getTransactionById,
  getAll,
  addNewProductTransaction,
  addPurchaseTransaction,
  addSellTransaction,
  addReturnToInventoryTransaction,
  addReturnToShelfTransaction,
  addStockTransaction,
  addDiscardFromInventoryTransaction,
  addDiscardFromShelfTransaction,
};
