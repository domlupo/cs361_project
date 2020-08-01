const express = require('express');
const authService = require('../services/authService');
const productService = require('../services/productService');

const productRouter = express.Router();

productRouter.get('/', authService.jwt, productService.getAll);
productRouter.get('/:id', authService.jwt, productService.getProductById);
productRouter.put(
  '/:id/sell',
  [authService.jwt, authService.cashierOnly],
  productService.sellProduct,
);
// productRouter.post(
//   '/create',
//   [authService.jwt, authService.buyerOnly],
//   productService.create,
//   );  //TO DO: write productService.create
// productRouter.post for insert product
// mimic authservice of sell, but check for proper user type

module.exports = productRouter;
