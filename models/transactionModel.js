const moment = require('moment');
const db = require('./db');
const constants = require('../constants/constants');

const getAll = async () => {
  return db.pool.asyncQuery(
    'SELECT * FROM Transactions INNER JOIN Products on Transactions.productID = Products.productID',
  );
};

const getTransactionById = async (id) => {
  return db.pool.asyncQuery(
    'SELECT * FROM Transactions WHERE transactionID = ?',
    [id],
  );
};

const createTransaction = async (transaction) => {
  const now = moment().format(constants.dateFormat);
  await db.pool.asyncQuery(
    'INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
    [
      transaction.userID,
      transaction.productID,
      transaction.date || now,
      transaction.quantity,
      transaction.startLocation,
      transaction.endLocation,
    ],
  );
  return db.pool.asyncQuery(
    'SELECT * FROM Transactions ORDER BY updatedAt DESC LIMIT 1',
  );
};

module.exports = {
  getAll,
  getTransactionById,
  createTransaction,
};
