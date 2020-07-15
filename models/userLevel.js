const db = require('./db');

const getAll = async () => {
  return db.pool.asyncQuery('SELECT * FROM UserLevels');
};

module.exports = {
  getAll,
};
