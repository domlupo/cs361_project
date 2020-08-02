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
productRouter.put(
  '/:id/restock',
  [authService.jwt, authService.buyerOnly],
  productService.restockProduct,
);
productRouter.put(
  '/:id/purchase',
  [authService.jwt, authService.buyerOnly],
  productService.purchaseProduct,
);

productRouter.post(
  '/create',
  [authService.jwt, authService.managementOnly],
  productService.create,
);

module.exports = productRouter;
