const passport = require('passport');
const userLevelModel = require('../models/userLevelModel');

const isManagement = (userLevel) =>
  userLevel.role === 'owner' || userLevel.role === 'manager';

const isCashier = (userLevel) => userLevel.role === 'cashier';

const isBuyer = (userLevel) => userLevel.role === 'buyer';

const checkUser = (validationFunction) => async (req, res, next) => {
  const { user } = res.locals;
  if (!user) {
    res.status(403);
    res.send({ message: 'Unauthorized' });
  } else {
    const userLevel = await userLevelModel.getUserLevelById(user.userLevelID);
    const valid = validationFunction(userLevel);
    if (valid) {
      res.locals.userLevel = userLevel;
      next();
    } else {
      res.status(403);
      res.send({ message: 'Unauthorized' });
    }
  }
};

// authentication middleware:
//  - we exit early in failed cases
//  - we attach the user object to the request so following routes can consume it

const login = (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) {
      console.error(err);
    }
    if (info) {
      res.status(403).send(info);
    } else {
      res.locals.user = user;
      next();
    }
  })(req, res, next);
};

const create = (req, res, next) => {
  passport.authenticate('create', async (err, passportUser, info) => {
    if (err) {
      console.error(err);
    }
    if (info) {
      res.status(400).send(info);
    } else {
      res.locals.passportUser = passportUser;
      next();
    }
  })(req, res, next);
};

const jwt = (req, res, next) => {
  passport.authenticate('jwt', async (err, user, info) => {
    if (err) {
      console.error(err);
    }
    if (info) {
      res.status(403).send(info);
    } else {
      res.locals.user = user;
      next();
    }
  })(req, res, next);
};

const managementOnly = async (req, res, next) => {
  await checkUser((userLevel) => isManagement(userLevel))(req, res, next);
};

const cashierOnly = async (req, res, next) => {
  await checkUser(
    (userLevel) => isManagement(userLevel) || isCashier(userLevel),
  )(req, res, next);
};

const buyerOnly = async (req, res, next) => {
  await checkUser((userLevel) => isManagement(userLevel) || isBuyer(userLevel))(
    req,
    res,
    next,
  );
};

module.exports = {
  create,
  login,
  jwt,
  managementOnly,
  cashierOnly,
  buyerOnly,
};
