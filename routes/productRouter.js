const express = require('express');
const authService = require('../services/authService');
const productService = require('../services/productService');

const productRouter = express.Router();

productRouter.get('/', authService.jwt, productService.getAll);
productRouter.get('/:id', authService.jwt, productService.getProductById);

module.exports = productRouter;
