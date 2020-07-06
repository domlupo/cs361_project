SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS UserLevels;
CREATE TABLE UserLevels(
	userLevelID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    role VARCHAR(50),
    createdAt DATETIME,
    updatedAt DATETIME,
    UNIQUE (role)
);

DROP TABLE IF EXISTS Users;
CREATE TABLE Users(
	userID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    userLevelID INT NOT NULL,
    name VARCHAR(50),
    password VARCHAR(255),
    createdAt DATETIME,
    updatedAT DATETIME,
    CONSTRAINT FOREIGN KEY (userLevelID) REFERENCES UserLevels(userLevelID)
);

DROP TABLE IF EXISTS Products;
CREATE TABLE Products(
	productID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(50),
    descript VARCHAR(255),
    price DECIMAL(8, 2),
    expirable TINYINT,
    createdAt DATETIME,
    updatedAT DATETIME
);

DROP TABLE IF EXISTS Transactions;
CREATE TABLE Transactions(
	transactionID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    userID INT NOT NULL,
    productID INT NOT NULL,
    date DATETIME,
    productQty INT,
    startLoc VARCHAR(10),
    endLoc VARCHAR(10),
    createdAt DATETIME,
    updatedAt DATETIME,
    CONSTRAINT FOREIGN KEY (userID) REFERENCES Users(userID),
    CONSTRAINT FOREIGN KEY (productID) REFERENCES Products(productID)
);

SET @@auto_increment_increment=10;
SET FOREIGN_KEY_CHECKS=1;