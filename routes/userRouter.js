const express = require('express');
const authService = require('../services/authService');
const userService = require('../services/userService');

const userRouter = express.Router();

userRouter.get('/', authService.jwt, userService.getAll);
userRouter.get('/level', authService.jwt, userService.getAllLevels);
userRouter.get('/delete', authService.jwt, userService.getAllLevels);
userRouter.get('/:id', authService.jwt, userService.getUserById);
userRouter.put(
  '/:id/level',
  [authService.jwt, authService.managementOnly],
  userService.editUserLevel,
);
userRouter.delete(
  '/:id',
  [authService.jwt, authService.managementOnly],
  userService.deleteUser,
);
userRouter.post('/login', authService.login, userService.login);
userRouter.post('/create', authService.create, userService.create);

module.exports = userRouter;
