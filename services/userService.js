const yup = require('yup');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const userLevelModel = require('../models/userLevelModel');

const getAll = async (req, res, next) => {
  let data;
  try {
    data = await userModel.getAll();
    res.send(data);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getUserById = async (req, res, next) => {
  let data;
  try {
    data = await userModel.getUserById(req.params.id);
    res.send(data);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { passportUser } = res.locals;
  const user = {
    ...req.body,
    password: passportUser.password,
    email: passportUser.email,
  };

  const userLevels = await userLevelModel.getAll();

  // validation of schema for necessary fields
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    userLevelID: yup
      .number()
      .oneOf(userLevels.map((userLevel) => userLevel.userLevelID)),
  });

  schema
    .validate(user)
    .then(async (validatedUser) => {
      const savedUser = await userModel.createUser(validatedUser);
      req.logIn(savedUser, () => {
        const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET);
        delete savedUser.password;
        res.status(200).send({
          user: savedUser,
          token,
        });
      });
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
    });
};

const login = async (req, res, next) => {
  const { user } = res.locals;
  req.logIn(user, () => {
    const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET);
    res.status(200).send({
      user,
      token,
    });
  });
};

module.exports = {
  getAll,
  getUserById,
  create,
  login,
};
