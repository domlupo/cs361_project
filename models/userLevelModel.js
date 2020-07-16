const db = require('./db');

const getAll = async () => {
  return db.pool.asyncQuery('SELECT * FROM UserLevels');
};

const getUserLevelById = async (id) => {
  const data = await db.pool.asyncQuery(
    'SELECT * FROM UserLevels WHERE userLevelID = ?',
    [id],
  );
  return data[0];
};

module.exports = {
  getAll,
  getUserLevelById,
};
