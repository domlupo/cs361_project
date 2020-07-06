SELECT * FROM UserLevels;
SELECT * FROM Users;
SELECT * FROM Transactions;
SELECT * FROM Products;

INSERT INTO UserLevels (role, createdAt, updatedAt) VALUES ('owner', NOW(), NOW());
INSERT INTO UserLevels (role, createdAt, updatedAt) VALUES ('manager', NOW(), NOW());
INSERT INTO UserLevels (role, createdAt, updatedAt) VALUES ('buyer', NOW(), NOW());
INSERT INTO UserLevels (role, createdAt, updatedAt) VALUES ('cashier', NOW(), NOW());

INSERT INTO Users (userLevelID, name, password, createdAt, updatedAt) VALUES (1, "thomas", "password", NOW(), NOW());
INSERT INTO Users (userLevelID, name, password, createdAt, updatedAt) VALUES (11, "jane", "password", NOW(), NOW());
INSERT INTO Users (userLevelID, name, password, createdAt, updatedAt) VALUES (21, "joe", "password", NOW(), NOW());
INSERT INTO Users (userLevelID, name, password, createdAt, updatedAt) VALUES (21, "megan", "password", NOW(), NOW());
INSERT INTO Users (userLevelID, name, password, createdAt, updatedAt) VALUES (31, "kevin", "password", NOW(), NOW());
INSERT INTO Users (userLevelID, name, password, createdAt, updatedAt) VALUES (31, "michelle", "password", NOW(), NOW());

INSERT INTO Products (name, descript, price, expirable, createdAt, updatedAt) VALUES ('tea', '100 count of english breakfast', 2.25, 0, NOW(), NOW());
INSERT INTO Products (name, descript, price, expirable, createdAt, updatedAt) VALUES ('coffe', '16oz can of preground coffee beans', 8.00, 0, NOW(), NOW());
INSERT INTO Products (name, descript, price, expirable, createdAt, updatedAt) VALUES ('tuna', '3oz metal can of shredded tuna', 1.10, 0, NOW(), NOW());
INSERT INTO Products (name, descript, price, expirable, createdAt, updatedAt) VALUES ('pasta', '12oz box of penne', 0.80, 0, NOW(), NOW());
INSERT INTO Products (name, descript, price, expirable, createdAt, updatedAt) VALUES ('beef', '16 oz package of 90/10', 3.25, 1, NOW(), NOW());
INSERT INTO Products (name, descript, price, expirable, createdAt, updatedAt) VALUES ('cheese', '16oz chunk of pecorino romano', 12.75, 0, NOW(), NOW());
INSERT INTO Products (name, descript, price, expirable, createdAt, updatedAt) VALUES ('milk', 'half gallon of milk', 1.50, 1, NOW(), NOW());

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