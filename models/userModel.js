const moment = require('moment');
const _ = require('lodash');
const db = require('./db');
const constants = require('../constants/constants');

// remove password for getAll/getUserById to prevent password from being accessed
const getAll = async () => {
  const data = await db.pool.asyncQuery('SELECT * FROM Users');
  data.forEach((user) => {
    // eslint-disable-next-line no-param-reassign
    delete user.password;
  });
  return data;
};

const getUserById = async (id) => {
  const data = await db.pool.asyncQuery(
    'SELECT * FROM Users WHERE userID = ?',
    [id],
  );
  const user = data[0];
  if (!_.isEmpty(user)) {
    delete user.password;
  }
  return user;
};

const getUserForAuthentication = async (email) => {
  // ONLY use for authentication - password is present
  const data = await db.pool.asyncQuery('SELECT * FROM Users WHERE email = ?', [
    email,
  ]);
  return data[0];
};

const updateUser = async (id, data) => {
  const now = moment().format(constants.dateFormat);
  await db.pool.asyncQuery(
    'UPDATE Users SET userLevelID = ?, firstName = ?, lastName = ?, updatedAt = ? WHERE Users.userID = ?',
    [data.userLevelID, data.firstName, data.lastName, now, id],
  );
  return getUserById(id);
};

const createUser = async (data) => {
  const now = moment().format(constants.dateFormat);
  await db.pool.asyncQuery(
    'INSERT INTO Users (userLevelID, email, password, firstName, lastName, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      data.userLevelID,
      data.email,
      data.password,
      data.firstName,
      data.lastName,
      now,
      now,
    ],
  );
  return getUserForAuthentication(data.email);
};

module.exports = {
  getAll,
  getUserById,
  getUserForAuthentication,
  updateUser,
  createUser,
};
