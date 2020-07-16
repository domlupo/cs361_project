const db = require('./db');

const getAll = async () => {
  return db.pool.asyncQuery('SELECT * FROM Products');
};

const getProductById = async (id) => {
  return db.pool.asyncQuery('SELECT * FROM Products WHERE productID = ?', [id]);
};

module.exports = {
  getAll,
  getProductById,
};
