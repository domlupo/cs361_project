const express = require('express');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const transactionRouter = require('./transactionRouter');

const router = express.Router();

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/transaction', transactionRouter);

module.exports = router;
