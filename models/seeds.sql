SELECT *
FROM UserLevels;
SELECT *
FROM Users;
SELECT *
FROM Transactions;
SELECT *
FROM Products;

INSERT INTO UserLevels (role, createdAt, updatedAt)
VALUES ('owner', NOW(), NOW());
INSERT INTO UserLevels (role, createdAt, updatedAt)
VALUES ('manager', NOW(), NOW());
INSERT INTO UserLevels (role, createdAt, updatedAt)
VALUES ('buyer', NOW(), NOW());
INSERT INTO UserLevels (role, createdAt, updatedAt)
VALUES ('cashier', NOW(), NOW());

# Note - when adding new users for testing purposes, any SQL based password should start with 'password'
INSERT INTO Users (userLevelID, email, password, firstName, lastName, createdAt, updatedAt)
VALUES ((SELECT userLevelID FROM UserLevels WHERE role = 'owner'), 'tsmith@gmail.com', 'password1', 'thomas', 'smith',
        NOW(), NOW());
INSERT INTO Users (userLevelID, email, password, firstName, lastName, createdAt, updatedAt)
VALUES ((SELECT userLevelID FROM UserLevels WHERE role = 'manager'), 'jdoe@gmail.com', 'password2', 'jane', 'doe',
        NOW(), NOW());
INSERT INTO Users (userLevelID, email, password, firstName, lastName, createdAt, updatedAt)
VALUES ((SELECT userLevelID FROM UserLevels WHERE role = 'buyer'), 'jdiaz@gmail.com', 'password3', 'joey', 'diaz',
        NOW(), NOW());
INSERT INTO Users (userLevelID, email, password, firstName, lastName, createdAt, updatedAt)
VALUES ((SELECT userLevelID FROM UserLevels WHERE role = 'buyer'), 'jrogan@gmail.com', 'password4', 'joe', 'rogan',
        NOW(), NOW());
INSERT INTO Users (userLevelID, email, password, firstName, lastName, createdAt, updatedAt)
VALUES ((SELECT userLevelID FROM UserLevels WHERE role = 'cashier'), 'gfring@gmail.com', 'password5', 'gus', 'fring',
        NOW(), NOW());
INSERT INTO Users (userLevelID, email, password, firstName, lastName, createdAt, updatedAt)
VALUES ((SELECT userLevelID FROM UserLevels WHERE role = 'cashier'), 'sgoodman@gmail.com', 'password6', 'saul',
        'goodman', NOW(), NOW());

INSERT INTO Products (code, name, descript, price, expirable, createdAt, updatedAt, shelfCount)
VALUES ('1010', 'tea', '100 count of english breakfast', 2.25, 0, NOW(), NOW(), 1);
INSERT INTO Products (code, name, descript, price, expirable, createdAt, updatedAt, shelfCount)
VALUES ('1020', 'coffee', '16oz can of preground coffee beans', 8.00, 0, NOW(), NOW(), 1);
INSERT INTO Products (code, name, descript, price, expirable, createdAt, updatedAt, shelfCount)
VALUES ('2060', 'tuna', '3oz metal can of shredded tuna', 1.10, 0, NOW(), NOW(), 1);
INSERT INTO Products (code, name, descript, price, expirable, createdAt, updatedAt, shelfCount)
VALUES ('404040', 'pasta', '12oz box of penne', 0.80, 0, NOW(), NOW(), 1);
INSERT INTO Products (code, name, descript, price, expirable, createdAt, updatedAt, shelfCount)
VALUES ('700700', 'beef', '16 oz package of 90/10', 3.25, 1, NOW(), NOW(), 1);
INSERT INTO Products (code, name, descript, price, expirable, createdAt, updatedAt, shelfCount)
VALUES ('2030', 'cheese', '16oz chunk of pecorino romano', 12.75, 0, NOW(), NOW(), 1);
INSERT INTO Products (code, name, descript, price, expirable, createdAt, updatedAt, shelfCount)
VALUES ('1000', 'milk', 'half gallon of milk', 1.50, 1, NOW(), NOW(), 1);

INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt)
VALUES ((SELECT userID FROM Users WHERE firstName = 'thomas'), (SELECT productID FROM Products WHERE name = 'tea'),
        NOW(), 30, 'inventory', 'shelf', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt)
VALUES ((SELECT userID FROM Users WHERE firstName = 'jane'), (SELECT productID FROM Products WHERE name = 'coffee'),
        NOW(), 20, 'inventory', 'shelf', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt)
VALUES ((SELECT userID FROM Users WHERE firstName = 'jane'), (SELECT productID FROM Products WHERE name = 'tuna'),
        NOW(), 45, 'inventory', 'shelf', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt)
VALUES ((SELECT userID FROM Users WHERE firstName = 'jane'), (SELECT productID FROM Products WHERE name = 'pasta'),
        NOW(), 35, 'inventory', 'shelf', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt)
VALUES ((SELECT userID FROM Users WHERE firstName = 'joey'), (SELECT productID FROM Products WHERE name = 'beef'),
        NOW(), 20, 'inventory', 'shelf', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt)
VALUES ((SELECT userID FROM Users WHERE firstName = 'joey'), (SELECT productID FROM Products WHERE name = 'cheese'),
        NOW(), 5, 'inventory', 'shelf', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt)
VALUES ((SELECT userID FROM Users WHERE firstName = 'joey'), (SELECT productID FROM Products WHERE name = 'milk'),
        NOW(), 110, 'inventory', 'shelf', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt)
VALUES ((SELECT userID FROM Users WHERE firstName = 'gus'), (SELECT productID FROM Products WHERE name = 'tuna'), NOW(),
        2, 'shelf', 'sold', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt)
VALUES ((SELECT userID FROM Users WHERE firstName = 'gus'), (SELECT productID FROM Products WHERE name = 'tea'), NOW(),
        1, 'shelf', 'sold', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt)
VALUES ((SELECT userID FROM Users WHERE firstName = 'gus'), (SELECT productID FROM Products WHERE name = 'beef'), NOW(),
        3, 'shelf', 'sold', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt)
VALUES ((SELECT userID FROM Users WHERE firstName = 'gus'), (SELECT productID FROM Products WHERE name = 'milk'), NOW(),
        10, 'shelf', 'sold', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt)
VALUES ((SELECT userID FROM Users WHERE firstName = 'jane'), (SELECT productID FROM Products WHERE name = 'tea'), NOW(),
        1, 'shelf', 'sold', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt)
VALUES ((SELECT userID FROM Users WHERE firstName = 'jane'), (SELECT productID FROM Products WHERE name = 'pasta'),
        NOW(), 1, 'shelf', 'sold', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt)
VALUES ((SELECT userID FROM Users WHERE firstName = 'saul'), (SELECT productID FROM Products WHERE name = 'pasta'),
        NOW(), 14, 'shelf', 'sold', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt)
VALUES ((SELECT userID FROM Users WHERE firstName = 'saul'), (SELECT productID FROM Products WHERE name = 'coffee'),
        NOW(), 10, 'shelf', 'sold', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt)
VALUES ((SELECT userID FROM Users WHERE firstName = 'saul'), (SELECT productID FROM Products WHERE name = 'tea'), NOW(),
        3, 'shelf', 'sold', NOW(), NOW());
INSERT INTO Transactions (userID, productID, date, productQty, startLoc, endLoc, createdAt, updatedAt)
VALUES ((SELECT userID FROM Users WHERE firstName = 'saul'), (SELECT productID FROM Products WHERE name = 'milk'),
        NOW(), 1, 'shelf', 'sold', NOW(), NOW());
