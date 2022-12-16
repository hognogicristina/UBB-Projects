GO
USE AppleStore
GO

-- new column to help for tests for a table with a multicolumn primary key
ALTER TABLE Available_Model ADD dateAdded INT

-- INSERT AND DELETE STATEMENTS
-- 1. A table with a single-column primary key and no foreign keys: Colour
-- insert into Colour
CREATE OR ALTER PROCEDURE addColour
@n INT
AS
BEGIN 
	DECLARE @i INT = 0
	WHILE @i < @n
	BEGIN
		INSERT INTO Colour(colName) VALUES (CONCAT('Type', @i))
		SET @i = @i + 1
	END
END
GO

-- delete from Colour
CREATE OR ALTER PROCEDURE deleteColour
AS
BEGIN
	DELETE FROM Colour WHERE colName LIKE 'Type%'
END
GO

-- insert into Model
CREATE OR ALTER PROCEDURE addModel
@n INT
AS
BEGIN 
	DECLARE @i INT = 0
	WHILE @i < @n
	BEGIN
		INSERT INTO Model(catID, modName) VALUES (1, CONCAT('Type', @i))
		SET @i = @i + 1
	END
END
GO

-- delete from Model
CREATE OR ALTER PROCEDURE deleteModel
AS
BEGIN
	DELETE FROM Model WHERE modName LIKE 'Type%'
END
GO

-- 2. A table with a single-column primary key and at least one foreign key: Colour and Products
-- insert into Products
CREATE OR ALTER PROCEDURE addProducts
@n INT
AS
BEGIN 
	DECLARE @i INT = 0
	WHILE @i < @n
	BEGIN
		DECLARE @type1 INT = (SELECT TOP 1 modID FROM Model WHERE modName LIKE 'Type%')
		DECLARE @type2 INT = (SELECT TOP 1 colID FROM Colour WHERE colName LIKE 'Type%')
		INSERT INTO Products(modID, colID, proName, proDescription, proRate) VALUES (@type1, @type2, CONCAT('Type', @i), CONCAT('', @i), CONCAT('', @i))
		SET @i = @i + 1
	END
END
GO

-- delete from Products
CREATE OR ALTER PROCEDURE deleteProducts
AS
BEGIN
	DELETE FROM Products WHERE proName LIKE 'Type%'
END
GO

-- 3. A table with a multicolumn primary key: Categories, Model, Available_Model and Colour
-- insert into Available_Model
CREATE OR ALTER PROCEDURE addAvailableModel
@n INT
AS
BEGIN
	DECLARE @i INT = 0
	DECLARE @colour INT
	DECLARE @model INT
	
	DECLARE cursorInsert CURSOR FOR 
	SELECT c.colID, m.modID 
	FROM (SELECT c.colID FROM Colour c WHERE colName LIKE 'Type%') c 
		 CROSS JOIN
		 (SELECT m.modID FROM Model m WHERE modName LIKE 'Type%') m
	
	OPEN cursorInsert
	FETCH cursorInsert INTO @colour, @model
	
	WHILE @i < @n
	BEGIN
		INSERT INTO Available_Model(colID, modID, dateAdded) VALUES (@colour, @model, -10)
		SET @i = @i + 1
		FETCH cursorInsert INTO @colour, @model
	END

	CLOSE cursorInsert
	DEALLOCATE cursorInsert
END
GO

-- delete from Available_Model
CREATE OR ALTER PROCEDURE deleteAvailableModel
AS
BEGIN
	DELETE FROM Available_Model WHERE dateAdded = -10
END
GO

-- VIEWS STATEMENT
-- 1. A view with a SELECT statement operating on one table.
CREATE OR ALTER VIEW nameColour
AS
	SELECT colName FROM Colour WHERE colName LIKE 'Type%'
GO

-- 2. A view with a SELECT statement that operates on at least 2 different tables and contains at least one JOIN operator.
CREATE OR ALTER VIEW coloursAndProducts
AS
	SELECT C.colName, P.proDescription
	FROM Colour C INNER JOIN Products P ON P.colID = C.colID
GO

-- 3. A view with a SELECT statement that has a GROUP BY clause, operates on at least 2 different tables and contains at least one JOIN operator.
GO
CREATE OR ALTER VIEW groupColourByModel 
AS
	SELECT C.colID, C.colName, COUNT(*) AS model
	FROM Colour C INNER JOIN Available_Model AM ON C.colID = AM.colID
	GROUP BY C.colID, C.colName
GO

-- SELECT VIEW STATEMENTS
CREATE OR ALTER PROCEDURE selectView(@name VARCHAR(100))
AS
BEGIN
	DECLARE @sql VARCHAR(250) = CONCAT('SELECT * FROM ', @name)
	EXEC (@sql)
END 
GO

-- INSERT VALUES INTO TESTS/ TABLES/ VIEWS
INSERT INTO Tests(Name) VALUES ('addColour'), ('deleteColour'), ('addModel'), ('deleteModel'), ('addProducts'), ('deleteProducts'), ('addAvailableModel'), ('deleteAvailableModel'), ('selectView')
INSERT INTO Tables(Name) VALUES ('Colour'), ('Model'), ('Products'), ('Available_Model')
INSERT INTO Views(Name) VALUES ('nameColour'), ('coloursAndProducts'), ('groupColourByModel')
INSERT INTO TestViews(TestID, ViewID) VALUES (9, 1), (9, 2), (9, 3)
INSERT INTO TestTables(TestID, TableID, NoOfRows, Position) VALUES (2, 1, 900, 4), (1, 1, 400, 1), (4, 2, 800, 3), (3, 2, 500, 2), (6, 3, 700, 2), (5, 3, 600, 3), (8, 4, 1000, 1), (7, 4, 1100, 4)

SELECT * FROM Tests
SELECT * FROM Tables
SELECT * FROM Views
SELECT * FROM TestViews
SELECT * FROM TestTables

-- TEST PROCEDURE STATEMENT
CREATE OR ALTER PROCEDURE runDeleteTest
AS
BEGIN
	-- I. Delete 3 tables: Available_Model, Products, Colour
	DECLARE @testID INT
	DECLARE @testName VARCHAR(100)

	-- declare a cursor for delete where TestID is even (delete procedures)
	DECLARE deleteCursor CURSOR FOR
	SELECT T1.Name, T2.TestID FROM Tests T1 JOIN TestTables T2 ON T1.TestID = T2.TestID 
	WHERE T1.Name LIKE 'delete%'
	ORDER BY Position
	
	OPEN deleteCursor 
	FETCH deleteCursor INTO @testName, @testID

	WHILE @@FETCH_STATUS = 0
	BEGIN 
		-- get the name of the test to be run
		DECLARE @deleteName VARCHAR(100) = (SELECT Name FROM Tests WHERE TestID = @testID AND Name = @testName)
		EXEC @deleteName

		-- code that processes @testID
		FETCH deleteCursor INTO @testName, @testID
	END

	CLOSE deleteCursor
	DEALLOCATE deleteCursor
END
GO

CREATE OR ALTER PROCEDURE runInsertTest (@runTableID INT)
AS
BEGIN
	-- II. Start inserting into tables one by one: Colour, Products, Available_Model and in TestRunTables
	DECLARE @testID INT
	DECLARE @tableID INT
	DECLARE @nrOfRows INT 
	DECLARE @testName VARCHAR(100)

	-- declare a cursor for delete where TestID is odd (insert procedures) from where you select TableID and NoOfRows 
	-- because we need to know where will the insert be made and how many rows are there to use
	DECLARE insertCursor CURSOR FOR
	SELECT T1.Name, T2.TestID, T2.TableID, T2.NoOfRows FROM Tests T1 JOIN TestTables T2 ON T1.TestID = T2.TestID
	WHERE T1.Name LIKE 'add%'
	ORDER BY Position
	
	OPEN insertCursor 
	FETCH insertCursor INTO @testName, @testID, @tableID, @nrOfRows

	WHILE @@FETCH_STATUS = 0
	BEGIN 
		-- get the name of the test to be run
		DECLARE @insertName VARCHAR(100) = (SELECT Name FROM Tests WHERE TestID = @testID AND Name = @testName)

		-- declare a time for when the insert tests start
		DECLARE @startAt DATETIME = GETDATE()

		EXEC (@insertName + ' ' + @nrOfRows)
		
		-- declare a time for when the insert tests end
		DECLARE @endAt DATETIME = GETDATE()

		-- insert into TestRunTables the result
		INSERT INTO TestRunTables(TestRunID, TableID, StartAt, EndAt) VALUES (@runTableID, @tableID, @startAt, @endAt)

		-- code that processes @testID, @tableID, @nrOfRows
		FETCH insertCursor INTO @testName, @testID, @tableID, @nrOfRows
	END

	CLOSE insertCursor
	DEALLOCATE insertCursor
END
GO

CREATE OR ALTER PROCEDURE runViewsTest (@runViewID INT)
AS
BEGIN
	-- III. Evaluate the views
	DECLARE @testID INT
	DECLARE @viewID INT

	-- declare a cursor for views
	DECLARE viewCursor CURSOR FOR
	SELECT TestID, ViewID FROM TestViews

	OPEN viewCursor 
	FETCH viewCursor INTO @testID, @viewID

	WHILE @@FETCH_STATUS = 0
	BEGIN 
		-- get the name of the test and view to be run
		DECLARE @testName VARCHAR(100) = (SELECT Name FROM Tests WHERE TestID = @testID)
		DECLARE @viewName VARCHAR(100) = (SELECT Name FROM Views WHERE ViewID = @viewID)

		-- declare a time for when the view tests start
		DECLARE @startAt DATETIME = GETDATE()

		EXEC (@testName + ' ' + @viewName)
		
		-- declare a time for when the view tests end
		DECLARE @endAt DATETIME = GETDATE()

		-- insert into TestRunViews the result
		INSERT INTO TestRunViews(TestRunID, ViewID, StartAt, EndAt) VALUES (@runViewID, @viewID, @startAt, @endAt)

		-- code that processes @testID, @viewID
		FETCH viewCursor INTO @testID, @viewID
	END

	CLOSE viewCursor
	DEALLOCATE viewCursor
END
GO

CREATE OR ALTER PROCEDURE runProcedure
AS
BEGIN
	-- insert into TestRuns table the current time (start time)
	INSERT INTO TestRuns(StartAt) VALUES (GETDATE())

	-- get the last inserted id from TestRuns table (the current test run)
	DECLARE @testID INT = SCOPE_IDENTITY()

	EXEC runDeleteTest
	EXEC runInsertTest @testID
	EXEC runViewsTest @testID

	UPDATE TestRuns SET Description = 'Delete | Insert | Select', EndAt = GETDATE() WHERE TestRunID = @testID

	SELECT * FROM TestRunTables
	SELECT * FROM TestRunViews
	SELECT * FROM TestRuns
END
GO

CREATE OR ALTER PROCEDURE runTest (@n INT)
AS
BEGIN
	DECLARE @i INT = 0
	WHILE @i < @n
	BEGIN
		EXEC runProcedure
		SET @i = @i + 1
	END

	SELECT * FROM TestRunTables
	SELECT * FROM TestRunViews
	SELECT * FROM TestRuns
END
GO

EXEC runTest 5
SELECT * FROM TestRuns