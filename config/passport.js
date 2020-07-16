const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const _ = require('lodash');
const userModel = require('../models/userModel');

const BCRYPT_SALT_ROUNDS = 12;

passport.use(
  'create',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (username, password, done) => {
      try {
        const user = userModel.getUserForAuthentication(username);
        if (!_.isEmpty(user)) {
          return done(null, false, { message: 'Username already taken' });
        }

        bcrypt
          .hash(password, BCRYPT_SALT_ROUNDS)
          .then(async (hashedPassword) => {
            // need to keep the hashed password for insertion later

            return done(null, { email: username, password: hashedPassword });
          });
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await userModel.getUserForAuthentication(email);
        if (_.isEmpty(user)) {
          return done(null, false, { message: 'User not found' });
        }

        // we delete the user password here so it doesn't get returned to the rest of the app

        // check for dev seeded accounts - all beginning with "password"
        if (
          password === user.password &&
          user.password.slice(0, 8) === 'password'
        ) {
          delete user.password;
          return done(null, user);
        }

        bcrypt.compare(password, user.password).then((response) => {
          if (response !== true) {
            return done(null, false, {
              message: 'Email and password combination invalid',
            });
          }
          delete user.password;
          return done(null, user);
        });
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (JWTPayload, done) => {
      // passport-jwt expects simple done() call without return
      console.log(JWTPayload);
      try {
        const user = userModel.getUserForAuthentication(JWTPayload.email);
        delete user.password;
        if (_.isEmpty(user)) {
          done(null, false);
        } else {
          done(null, user);
        }
      } catch (err) {
        done(err);
      }
    },
  ),
);
