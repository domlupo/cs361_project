const db = require('./db');

const getAll = async () => {
  return db.pool.asyncQuery('SELECT * FROM Transactions');
};

const getTransactionById = async (id) => {
  return db.pool.asyncQuery(
    'SELECT * FROM Transactions WHERE transactionID = ?',
    [id],
  );
};

module.exports = {
  getAll,
  getTransactionById,
};
