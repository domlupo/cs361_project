const db = require('./db');

const getAll = async () => {
  return db.pool.asyncQuery('SELECT * FROM Users');
};

const getUser = async (id) => {
  return db.pool.asyncQuery('SELECT * FROM Users');
};

const updateUser = (id, data) => {};

module.exports = {
  getAll,
  getUser,
  updateUser,
};
