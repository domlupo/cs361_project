const yup = require('yup');
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

const create = async (req, res, next) => {
  const newProd = req.body;

  // validation of schema for necessary fields
  const schema = yup.object().shape({
    prodName: yup.string().required(),
    code: yup.string().required(), // TO DO: force this to be unique
    descript: yup.string().required(),
    price: yup.number().required(),
    expirable: yup.number().required(), // TO DO: change to bool and/or only allow 1 or 0 on front end
  });

  schema
    .validate(newProd)
    .then(async (validatedProd) => {
      const savedProd = await productModel.createProduct(validatedProd);
      console.log(`saved prod is ${savedProd}`);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
    });
};

const sellProduct = async (req, res, next) => {
  let product;
  try {
    const { id } = req.params;
    const { body } = req;
    const { user } = res.locals;
    const quantity = body?.productQty
      ? Number.parseInt(body?.productQty, 10)
      : null;
    if (!quantity) {
      throw new Error('Missing product quantity');
    }
    product = await productModel.getProductById(id);
    if (product.shelfCount < quantity) {
      throw new Error("There aren't enough available products");
    }
    product = await productModel.editProductQuantity(id, {
      shelfCount: product.shelfCount - quantity,
      inventoryCount: product.inventoryCount,
    });
    await transactionService.addSellTransaction(
      user,
      product,
      utils.getNowFormatted(),
      quantity,
    );
    res.send(product);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

// TO DO: need a create product service copy from user service create

module.exports = {
  getProductById,
  create,
  getAll,
  sellProduct,
};
