const passport = require('passport');
const userLevelModel = require('../models/userLevelModel');

// authentication middleware:
//  - we exit early in failed cases
//  - we attach the user object to the request so following routes can consume it

const login = (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) {
      console.error(err);
    }
    if (info) {
      res.status(403);
      res.send(info.message);
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
      res.status(400);
      res.send(info.message);
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
      res.status(403);
      res.send(info.message);
    } else {
      res.locals.user = user;
      next();
    }
  })(req, res, next);
};

const managementOnly = async (req, res, next) => {
  const { user } = res.locals;
  if (!user) {
    res.status(403);
    res.send({ message: 'Unauthorized' });
  } else {
    const userLevel = await userLevelModel.getUserLevelById(user.userLevelID);

    if (userLevel.role !== 'owner' && userLevel.role !== 'manager') {
      res.status(403);
      res.send({ message: 'Unauthorized' });
    } else {
      res.locals.userLevel = userLevel;
      next();
    }
  }
};

module.exports = {
  create,
  login,
  jwt,
  managementOnly,
};
