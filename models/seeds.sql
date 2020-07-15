SELECT * FROM UserLevels;
SELECT * FROM Users;
SELECT * FROM Transactions;
SELECT * FROM Products;

INSERT INTO UserLevels (role, createdAt, updatedAt) VALUES ('owner', NOW(), NOW());
INSERT INTO UserLevels (role, createdAt, updatedAt) VALUES ('manager', NOW(), NOW());
INSERT INTO UserLevels (role, createdAt, updatedAt) VALUES ('buyer', NOW(), NOW());
INSERT INTO UserLevels (role, createdAt, updatedAt) VALUES ('cashier', NOW(), NOW());

INSERT INTO Users (userLevelID, email, password, firstName, lastName, createdAt, updatedAt) VALUES (1, 'tsmith@gmail.com', 'password1', 'thomas', 'smith', NOW(), NOW());
INSERT INTO Users (userLevelID, email, password, firstName, lastName, createdAt, updatedAt) VALUES (11, 'jdoe@gmail.com', 'password2', 'jane', 'doe', NOW(), NOW());
INSERT INTO Users (userLevelID, email, password, firstName, lastName, createdAt, updatedAt) VALUES (21, 'jdiaz@gmail.com', 'password3', 'joey', 'diaz', NOW(), NOW());
INSERT INTO Users (userLevelID, email, password, firstName, lastName, createdAt, updatedAt) VALUES (21, 'jrogan@gmail.com', 'password4', 'joe', 'rogan', NOW(), NOW());
INSERT INTO Users (userLevelID, email, password, firstName, lastName, createdAt, updatedAt) VALUES (31, 'gfring@gmail.com', 'password5', 'gus', 'fring', NOW(), NOW());
INSERT INTO Users (userLevelID, email, password, firstName, lastName, createdAt, updatedAt) VALUES (31, 'sgoodman@gmail.com', 'password6', 'saul', 'goodman', NOW(), NOW());

INSERT INTO Products (code, name, descript, price, expirable, createdAt, updatedAt) VALUES ('1010', 'tea', '100 count of english breakfast', 2.25, 0, NOW(), NOW());
INSERT INTO Products (code, name, descript, price, expirable, createdAt, updatedAt) VALUES ('1020', 'coffee', '16oz can of preground coffee beans', 8.00, 0, NOW(), NOW());
INSERT INTO Products (code, name, descript, price, expirable, createdAt, updatedAt) VALUES ('2060', 'tuna', '3oz metal can of shredded tuna', 1.10, 0, NOW(), NOW());
INSERT INTO Products (code, name, descript, price, expirable, createdAt, updatedAt) VALUES ('404040', 'pasta', '12oz box of penne', 0.80, 0, NOW(), NOW());
INSERT INTO Products (code, name, descript, price, expirable, createdAt, updatedAt) VALUES ('700700', 'beef', '16 oz package of 90/10', 3.25, 1, NOW(), NOW());
INSERT INTO Products (code, name, descript, price, expirable, createdAt, updatedAt) VALUES ('2030', 'cheese', '16oz chunk of pecorino romano', 12.75, 0, NOW(), NOW());
INSERT INTO Products (code, name, descript, price, expirable, createdAt, updatedAt) VALUES ('1000', 'milk', 'half gallon of milk', 1.50, 1, NOW(), NOW());

INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt) VALUES (21, 1, NOW(), 30, 'inventory', 'shelf', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt) VALUES (21, 11, NOW(), 20, 'inventory', 'shelf', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt) VALUES (21, 21, NOW(), 45, 'inventory', 'shelf', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt) VALUES (21, 31, NOW(), 35, 'inventory', 'shelf', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt) VALUES (31, 41, NOW(), 20, 'inventory', 'shelf', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt) VALUES (31, 41, NOW(), 5, 'inventory', 'shelf', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt) VALUES (31, 51, NOW(), 110, 'inventory', 'shelf', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt) VALUES (41, 1, NOW(), 2, 'shelf', 'sold', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt) VALUES (41, 1, NOW(), 1, 'shelf', 'sold', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt) VALUES (41, 11, NOW(), 3, 'shelf', 'sold', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt) VALUES (51, 1, NOW(), 10, 'shelf', 'sold', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt) VALUES (51, 1, NOW(), 1, 'shelf', 'sold', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt) VALUES (51, 11, NOW(), 1, 'shelf', 'sold', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt) VALUES (51, 21, NOW(), 14, 'shelf', 'sold', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt) VALUES (51, 31, NOW(), 10, 'shelf', 'sold', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt) VALUES (51, 41, NOW(), 3, 'shelf', 'sold', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt) VALUES (51, 41, NOW(), 1, 'shelf', 'sold', NOW(), NOW());