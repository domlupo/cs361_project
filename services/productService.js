const productModel = require('../models/productModel');
const transactionService = require('./transactionService');
const utils = require('../utils/serverUtils');

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

const sellProduct = async (req, res, next) => {
  let product;
  try {
    const { id } = req.params;
    const { body } = req;
    const { user } = res.locals;
    if (!body?.productQty) {
      throw new Error('Missing productQty');
    }
    product = await productModel.getProductById(id);
    if (product.shelfCount < body.productQty) {
      throw new Error("There aren't enough available products");
    }
    product = await productModel.editProductQuantity(id, {
      shelfCount: product.shelfCount - body.productQty,
      inventoryCount: product.inventoryCount,
    });
    await transactionService.addSellTransaction(
      user,
      product,
      utils.getNowFormatted(),
      body.productQty,
    );
    res.send(product);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = {
  getProductById,
  getAll,
  sellProduct,
};
