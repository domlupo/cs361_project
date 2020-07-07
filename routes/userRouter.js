const express = require('express');
const userService = require('../services/userService');

const userRouter = express.Router();

userRouter.get('/', userService.getAll);
userRouter.get('/:id', userService.getById);

module.exports = userRouter;
