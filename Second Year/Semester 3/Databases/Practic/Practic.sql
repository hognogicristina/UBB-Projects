USE master 
GO
ALTER DATABASE practicDB
SET single_user WITH ROLLBACK IMMEDIATE
DROP DATABASE practicDB

CREATE DATABASE practicDB

GO
USE practicDB
GO

-- Create a database to manage restaurant menus. 
-- The database will store data about the menus from all the restaurants. 
-- The entities of interest to the problem domain are: Products, Product, Types, Restaurants and Menus. 
-- Each product has a name, a description and belongs to a type.
-- A product type has a name and a description. Each restaurant has a name. 
-- Restaurant names are unique. Each menu has a name, an associated restaurant, and a list of items with a weight and price. 
-- Menu names are unique. The weight and price are represented as a pair of an integer number and a decimal number, 
-- e.g., there are 300 grs of item and costs 15.7St.

-- 1. Write an SQL script that creates the corresponding relational data model.
CREATE TABLE Product (
	-- Each product has a name, a description and belongs to a type.
	pid INT PRIMARY KEY IDENTITY(1, 1),
	name VARCHAR(50),
	description VARCHAR(100)
);

CREATE TABLE Types (
	-- A product type has a name and a description.
	tid INT PRIMARY KEY IDENTITY(1, 1),
	name VARCHAR(50),
	description VARCHAR(100)
);

CREATE TABLE Products (
	tid INT FOREIGN KEY REFERENCES Types(tid),
	pid INT FOREIGN KEY REFERENCES Product(pid),
	CONSTRAINT PK_Products PRIMARY KEY (tid, pid)
);

CREATE TABLE Restaurant (
	-- Each restaurant has a name. Restaurant names are unique.
	rid INT PRIMARY KEY IDENTITY(1, 1),
	name VARCHAR(50) UNIQUE
);

CREATE TABLE Menu (
	-- Each menu has a name, an associated restaurant, and a list of items with a weight and price.
	mid INT PRIMARY KEY IDENTITY(1, 1),
	name VARCHAR(50) UNIQUE,
	rid INT FOREIGN KEY REFERENCES Restaurant(rid),
);

CREATE TABLE Items (
	mid INT FOREIGN KEY REFERENCES Menu(mid),
	pid INT FOREIGN KEY REFERENCES Product(pid),
	weight INT,
	price DECIMAL(10, 2),
	UNIQUE (mid, pid),
	CONSTRAINT PK_Items PRIMARY KEY (mid, pid)
);

-- 2. Implement a stored procedure that receives a menu, a product, weight and price values, and adds the product to the menu. 
-- If the product is already in the menu, the weight and price values are updated.
GO 
CREATE OR ALTER PROCEDURE AddProductToMenu (@menu INT, @product INT, @weight INT, @price DECIMAL(10, 2))
AS
BEGIN
	IF EXISTS (SELECT * FROM Items WHERE mid = @menu AND pid = @product)
	BEGIN
		UPDATE Items SET weight = @weight, price = @price WHERE mid = @menu AND pid = @product
	END
	ELSE
	BEGIN
		INSERT INTO Items VALUES (@menu, @product, @weight, @price)
	END
END

GO 
CREATE OR ALTER PROCEDURE addProd (@menu INT, @product INT, @weight INT, @price INT)
AS
BEGIN
	DECLARE @nr int;
	SET @nr = 0;
	SELECT @nr = COUNT(*) FROM Items WHERE mid = @menu AND pid = @product
	
	IF(@nr <> 0) BEGIN
		-- adds product to the menu
		UPDATE Items SET weight = @weight, price = @price WHERE mid = @menu AND pid = @product
	END
	ELSE BEGIN
		-- if already in the menu weight and price update
		INSERT INTO Items VALUES (@menu, @product, @weight, @price)
	END
END
GO

-- 3. Create a view that shows the names of the restaurants that have all the products.
GO
CREATE OR ALTER VIEW AllProducts 
AS
	SELECT r.name
	FROM Restaurant r
	LEFT JOIN Menu m ON r.rid = m.rid
	LEFT JOIN Items i ON m.mid = i.mid
	LEFT JOIN Product p ON i.pid = p.pid
	WHERE NOT EXISTS (SELECT * FROM Product WHERE pid NOT IN 
					 (SELECT pid FROM Menu WHERE rid = R.rid))
GO

-- 4. Implement a function that lists the names of the products with the average price/gr greater than R, where R is a function parameter.
GO
CREATE OR ALTER FUNCTION ProductsWithAvgPriceGr (@r DECIMAL(10, 2))
RETURNS TABLE
AS
RETURN
	SELECT p.name, AVG(i.price / i.weight) AS avg_price_gr
	FROM Product p
	LEFT JOIN Items i ON p.pid = i.pid
	GROUP BY p.name
	HAVING AVG(i.price / i.weight) > @r
GO

-- Insert 5 data rows in each table.
INSERT INTO Types VALUES ('Meat', 'Meat products');
INSERT INTO Types VALUES ('Fish', 'Fish products');
INSERT INTO Types VALUES ('Vegetables', 'Vegetables products');
INSERT INTO Types VALUES ('Fruits', 'Fruits products');
INSERT INTO Types VALUES ('Drinks', 'Drinks products');

INSERT INTO Product VALUES ('Steak', 'Steak');
INSERT INTO Product VALUES ('Chicken', 'Chicken');
INSERT INTO Product VALUES ('Salmon', 'Salmon');
INSERT INTO Product VALUES ('Tuna', 'Tuna');
INSERT INTO Product VALUES ('Potato', 'Potato');

INSERT INTO Restaurant VALUES ('Restaurant 1');
INSERT INTO Restaurant VALUES ('Restaurant 2');
INSERT INTO Restaurant VALUES ('Restaurant 3');

INSERT INTO Menu VALUES ('Menu 1', 1);
INSERT INTO Menu VALUES ('Menu 2', 2);
INSERT INTO Menu VALUES ('Menu 3', 3);

INSERT INTO Items VALUES (1, 1, 300, 15.7);
INSERT INTO Items VALUES (1, 2, 200, 10.5);
INSERT INTO Items VALUES (1, 3, 100, 5.3);
INSERT INTO Items VALUES (1, 4, 100, 5.3);
INSERT INTO Items VALUES (1, 5, 100, 5.3);
INSERT INTO Items VALUES (2, 1, 300, 15.7);
INSERT INTO Items VALUES (2, 2, 200, 10.5);
INSERT INTO Items VALUES (2, 3, 100, 5.3);
INSERT INTO Items VALUES (2, 4, 100, 5.3);
INSERT INTO Items VALUES (2, 5, 100, 5.3);

SELECT * FROM Product
SELECT * FROM Types
SELECT * FROM Products
SELECT * FROM Restaurant
SELECT * FROM Menu
SELECT * FROM Items

EXEC AddProductToMenu 1, 1, 300, 15.7
SELECT * FROM Product
SELECT * FROM Items

SELECT * FROM AllProducts
SELECT * FROM ProductsWithAvgPriceGr(5.3) 