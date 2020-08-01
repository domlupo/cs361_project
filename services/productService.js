const productModel = require('../models/productModel');
const transactionService = require('./transactionService');
const utils = require('../utils/serverUtils');

const getAll = async (req, res, next) => {
  let data;
  try {
    data = await productModel.getAll();
    res.send(data);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getProductById = async (req, res, next) => {
  let data;
  try {
    data = await productModel.getProductById(req.params.id);
    res.send(data);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

/// /////////////////////////////
/// TO DO fix this. Was copied from userService.create
// const create = async (req, res, next) => {
//   const { newProduct } = res.locals;
//   const product = {
//     ...req.body,
//     password: passportUser.password,
//     email: passportUser.email,
//   };

//   const userLevels = await userLevelModel.getAll();

//   // validation of schema for necessary fields
//   const schema = yup.object().shape({
//     email: yup.string().email().required(),
//     password: yup.string().required(),
//     firstName: yup.string().required(),
//     lastName: yup.string().required(),
//     userLevelID: yup
//       .number()
//       .oneOf(userLevels.map((userLevel) => userLevel.userLevelID))
//       .required(),
//   });

//   schema
//     .validate(user)
//     .then(async (validatedUser) => {
//       const savedUser = await userModel.createUser(validatedUser);
//       req.logIn(savedUser, () => {
//         const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET, {
//           expiresIn: '1d',
//         });
//         delete savedUser.password;
//         res.status(200).send({
//           user: savedUser,
//           token,
//         });
//       });
//     })
//     .catch((error) => {
//       res.status(400);
//       res.send(error);
//     });
// };
/// //////////

const sellProduct = async (req, res, next) => {
  let product;
  try {
    const { id } = req.params;
    const { body } = req;
    const { user } = res.locals;
    const quantity = body?.productQty
      ? Number.parseInt(body?.productQty, 10)
      : null;
    if (!quantity) {
      throw new Error('Missing product quantity');
    }
    product = await productModel.getProductById(id);
    if (product.shelfCount < quantity) {
      throw new Error("There aren't enough available products");
    }
    product = await productModel.editProductQuantity(id, {
      shelfCount: product.shelfCount - quantity,
      inventoryCount: product.inventoryCount,
    });
    await transactionService.addSellTransaction(
      user,
      product,
      utils.getNowFormatted(),
      quantity,
    );
    res.send(product);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

// TO DO: need a create product service copy from user service create

module.exports = {
  getProductById,
  getAll,
  sellProduct,
};
