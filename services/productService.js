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
    code: yup.string().required(), 
    descript: yup.string().required(),
    price: yup.number().required(),
    expirable: yup.number().required(), 
  });

  schema
    .validate(newProd)
    .then(async (validatedProd) => {
      const savedProd = await productModel.createProduct(validatedProd);
      res.status(200).send({
        product: savedProd,
      });
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


const restockProduct = async (req, res, next) => {
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
    if (product.inventoryCount < quantity) {
      throw new Error("There aren't enough available products");
    }
    product = await productModel.editProductQuantity(id, {
      shelfCount: product.shelfCount + quantity,
      inventoryCount: product.inventoryCount - quantity,
    });
    await transactionService.addStockTransaction(
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

const purchaseProduct = async (req, res, next) => {
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
    product = await productModel.editProductQuantity(id, {
      shelfCount: product.shelfCount,
      inventoryCount: product.inventoryCount + quantity,
    });
    await transactionService.addPurchaseTransaction(
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


module.exports = {
  getProductById,
  create,
  getAll,
  sellProduct,
  purchaseProduct,
  restockProduct,
};
