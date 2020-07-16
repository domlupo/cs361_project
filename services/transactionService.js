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

module.exports = {
  getTransactionById,
  getAll,
};
