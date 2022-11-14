-- DROP DATABASE STATEMENTS
USE master 
GO

ALTER DATABASE AppleStore 
SET single_user WITH ROLLBACK IMMEDIATE
DROP DATABASE AppleStore

-- CREATE DATABASE STATEMENTS
CREATE DATABASE AppleStore

GO
USE AppleStore
GO

-- DROP STATEMENTS
DROP TABLE Payment;
DROP TABLE Deliveries;
DROP TABLE Orders;
DROP TABLE Work_In;
DROP TABLE Stores;
DROP TABLE Employee;
DROP TABLE Products;
DROP TABLE Available_Categories;
DROP TABLE Available_Model;
DROP TABLE Model;
DROP TABLE Colour;
DROP TABLE Customers;
DROP TABLE Categories;

-- CREATE TABLE STATEMENTS
CREATE TABLE Categories (
	catID int primary key identity, -- auto increments primary key = personl/unique id
	catName varchar(30) NOT NULL
);

CREATE TABLE Model (
	modID int primary key identity,
	catID int foreign key references Categories(catID) NOT NULL, -- foreign key = an id taken from another table
	modName varchar(30) NOT NULL
);

CREATE TABLE Colour (
	-- m(colours):n(products)
	colID int primary key identity,
	colName varchar(30) NOT NULL
);

CREATE TABLE Available_Model (
	colID int foreign key references Colour(colID) NOT NULL,
	modID int foreign key references Model(modID) NOT NULL,
	constraint PK_Available_Model primary key(colID, modID)
);

CREATE TABLE Available_Categories (
	colID int foreign key references Colour(colID) NOT NULL,
	catID int foreign key references Categories(catID) NOT NULL,
	constraint PK_Available_Categories primary key(colID, catID)
);

CREATE TABLE Stores (
	-- 1(store):n(employees)
	stoID int primary key identity,
	stoLoc varchar(200) NOT NULL
);

CREATE TABLE Products (
	-- m(products):n(colours)
	proID int primary key identity,
	modID int foreign key references Model(modID) NOT NULL,
	colID int foreign key references Colour(colID) NOT NULL,
	proName varchar(100) NOT NULL,
	proDescription varchar(500) NOT NULL,
	proRate int
);

CREATE TABLE Employee (
	empID int primary key identity,
	catID int foreign key references Categories(catID) NOT NULL,
	empName varchar(100) NOT NULL,
	empSalary int,
	empWork int,
	empJob varchar(100) NOT NULL, 
	empExperience int
);

CREATE TABLE Work_In (
	stoID int foreign key references Stores(stoID) NOT NULL,
	empID int foreign key references Employee(empID) NOT NULL,
	constraint PK_Work_In primary key(stoID, empID)
);

CREATE TABLE Customers (
	-- 1(customer):n(orders)
	cusID int primary key identity,
	cusName varchar(100) NOT NULL,
	cusPhoneNr int,
	cusAdrres varchar(200) NOT NULL
);

CREATE TABLE Orders (
	ordID int primary key identity,
	cusID int foreign key references Customers(cusID) NOT NULL,
	proID int foreign key references Products(proID) NOT NULL,
	ordDate date
);

CREATE TABLE Payment (
	ordID int foreign key references Orders(ordID) NOT NULL,
	payDate date,
	payType varchar(50),
	constraint PK_Payment primary key(ordID)
);

CREATE TABLE Deliveries (
	delID int primary key identity,
	ordID int NOT NULL,
	constraint FK_Deliveries foreign key(ordID) references Orders(ordID),
	delDate date
);