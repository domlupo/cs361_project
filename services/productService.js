const productModel = require('../models/productModel');

const getAll = async (req, res, next) => {
  let data;
  try {
    data = await productModel.getAll();
    res.send(data);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getProductById = async (req, res, next) => {
  let data;
  try {
    data = await productModel.getProductById(req.params.id);
    res.send(data);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = {
  getProductById,
  getAll,
};
