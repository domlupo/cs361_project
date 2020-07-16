const passport = require('passport');

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

module.exports = {
  create,
  login,
  jwt,
};
