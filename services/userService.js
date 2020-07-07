const userModel = require('../models/user');

const getAll = async (req, res, next) => {
  let data;
  try {
    data = await userModel.getAll();
    console.log(data);
    res.send(data);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  let data;
  try {
    data = await userModel.getUser(req.params.id);
    console.log(data);
    res.send(data);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
};
