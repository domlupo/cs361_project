const express = require('express');
const authService = require('../services/authService');
const transactionService = require('../services/transactionService');

const transactionRouter = express.Router();

transactionRouter.get('/', authService.jwt, transactionService.getAll);
transactionRouter.get(
  '/:id',
  authService.jwt,
  transactionService.getTransactionById,
);

module.exports = transactionRouter;
