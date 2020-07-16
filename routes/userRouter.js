const express = require('express');
const authService = require('../services/authService');
const userService = require('../services/userService');

const userRouter = express.Router();

userRouter.get('/', authService.jwt, userService.getAll);
userRouter.get('/:id', authService.jwt, userService.getUserById);
userRouter.post('/login', authService.login, userService.login);
userRouter.post('/create', authService.create, userService.create);

module.exports = userRouter;
