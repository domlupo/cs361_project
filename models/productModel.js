const db = require('./db');

const getAll = async () => {
  return db.pool.asyncQuery('SELECT * FROM Products');
};

const getProductById = async (id) => {
  const data = await db.pool.asyncQuery(
    'SELECT * FROM Products WHERE productID = ?',
    [id],
  );
  return data[0];
};

const getProductByCode = async (code) => {
  const data = await db.pool.asyncQuery(
    'SELECT * FROM Products WHERE code = ?',
    [code],
  );
  return data[0];
};

const editProductQuantity = async (id, { shelfCount, inventoryCount }) => {
  await db.pool.asyncQuery(
    'UPDATE Products SET inventoryCount = ?, shelfCount = ? WHERE productID = ?',
    [inventoryCount, shelfCount, id],
  );
  return getProductById(id);
};

const createProduct = async (data) => {
  await db.pool.asyncQuery(
    'INSERT INTO Products (code, name, descript, price, expirable, inventoryCount, shelfCount, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
    [data.code, data.prodName, data.descript, data.price, data.expirable, 0, 0],
  );
  const savedProd = await getProductByCode(data.code);
  return savedProd;
};

module.exports = {
  getAll,
  getProductById,
  editProductQuantity,
  createProduct,
};
