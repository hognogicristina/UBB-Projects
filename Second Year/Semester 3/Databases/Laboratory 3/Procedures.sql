GO
USE AppleStore
GO

-- SQL SCRIPTS STATEMENTS
-- First part of the homework
-- a1. modify the type of a column (modify rate into varchar)
CREATE OR ALTER PROCEDURE modifyRate
AS 
BEGIN
	ALTER TABLE Products ALTER COLUMN proRate VARCHAR(50)
	PRINT 'ALTER TABLE Products FROM INT to VARCHAR'
END
GO

-- a2. modify the type of a column (undo rate)
CREATE OR ALTER PROCEDURE undoRate
AS
BEGIN
	ALTER TABLE Products ALTER COLUMN proRate INT
	PRINT 'ALTER TABLE Products FROM VARCHAR to INT'
END
GO

-- b1. add a column (add stoName in Stores)
CREATE OR ALTER PROCEDURE addStoName
AS 
BEGIN
	ALTER TABLE Stores ADD stoName VARCHAR(100)
	PRINT 'ALTER TABLE Stores ADD COLUMN stoName to Stores'
END
GO

-- b2. remove a column (undo stoName)
CREATE OR ALTER PROCEDURE undoStoName
AS
BEGIN
	ALTER TABLE Stores DROP COLUMN stoName
	PRINT 'ALTER TABLE Stores DROP COLUMN stoName from Stores'
END
GO

-- c1. add a DEFAULT constraint (default rate = 0)
CREATE OR ALTER PROCEDURE defaultRate
AS
BEGIN 
	ALTER TABLE Products ADD CONSTRAINT proRateDefault DEFAULT 0 FOR proRate
	PRINT 'ALTER TABLE Products ADD CONSTRAINT DEFAULT 0 FOR proRate'
END
GO

-- c2. remove a DEFAULT constraint (undo default rate)
CREATE OR ALTER PROCEDURE undoRateDefault
AS
BEGIN 
	ALTER TABLE Products DROP CONSTRAINT proRateDefault
	PRINT 'ALTER TABLE Products DROP CONSTRAINT DEFAULT 0 FOR proRate'
END
GO

-- d1. remove a primary key (stoID and empID not a PK anymore)
CREATE OR ALTER PROCEDURE removePKWorkIn
AS
BEGIN
	ALTER TABLE Work_In DROP CONSTRAINT PK_Work_In
	PRINT 'ALTER TABLE Work_In DROP CONSTRAINT PK_Work_In'
END
GO

-- d2. add a primary key (add stoID and empID a PK back)
CREATE OR ALTER PROCEDURE addPKWorkIn
AS
BEGIN
	ALTER TABLE Work_In ADD CONSTRAINT PK_Work_In PRIMARY KEY(stoID, empID)
	PRINT 'ALTER TABLE Work_In ADD CONSTRAINT PK_Accessories PRIMARY KEY(stoID, empID)'
END
GO

-- e1. add a candidate key (cusPhoneNr and cusAdrres is a CK)
CREATE OR ALTER PROCEDURE addCKCustomers
AS
BEGIN
	ALTER TABLE Customers ADD CONSTRAINT CK_Customers UNIQUE(cusPhoneNr, cusAdrres)
	PRINT 'ALTER TABLE Customers ADD CONSTRAINT CK_Customers UNIQUE(cusPhoneNr, cusAdrres)'
END
GO

-- e2. remove a candidate key (undo cusPhoneNr and cusAdrres)
CREATE OR ALTER PROCEDURE undoCKCustomers
AS
BEGIN
	ALTER TABLE Customers DROP CONSTRAINT CK_Customers
	PRINT 'ALTER TABLE Customers DROP CONSTRAINT CK_Customers'
END
GO

-- f1. remove a foreign key (ordID not a FK anymore)
CREATE OR ALTER PROCEDURE removeFKDeliveries
AS
BEGIN
	ALTER TABLE Deliveries DROP CONSTRAINT FK_Deliveries
	PRINT 'ALTER TABLE Deliveries DROP CONSTRAINT FK_Deliveries'
END
GO

-- f2. add a foreign key (add ordID a FK back)
CREATE OR ALTER PROCEDURE addFKDeliveries
AS
BEGIN
	ALTER TABLE Deliveries ADD CONSTRAINT FK_Deliveries FOREIGN KEY(ordID) REFERENCES Orders(ordID)
	PRINT 'ALTER TABLE Deliveries ADD CONSTRAINT FK_Deliveries FOREIGN KEY(ordID) REFERENCES Orders(ordID)'
END
GO

-- g1. create a table (table Accessories)
CREATE OR ALTER PROCEDURE addAccessories
AS 
BEGIN 
	CREATE TABLE Accessories (
		accID int primary key,
		modID int NOT NULL,
		accTitle varchar(100) NOT NULL)
		PRINT 'CREATE TABLE Accessories'
END
GO

-- g2. drop a table (undo Accessories)
CREATE OR ALTER PROCEDURE undoAccessories
AS
BEGIN
	DROP TABLE IF EXISTS Accessories
	PRINT 'DROP TABLE Accessories'
END
GO

EXEC modifyRate
EXEC undoRate

EXEC addStoName
EXEC undoStoName
SELECT * FROM Stores

EXEC defaultRate
INSERT INTO Products(modID, colID, proName, proDescription) VALUES (12, 3, 'AirPods Max White', 'AirPods Max is a perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods. The ultimate personal listening experience is here.')
SELECT * FROM Products
EXEC undoRateDefault
DELETE FROM Products
WHERE proID > 17

EXEC removePKWorkIn
EXEC addPKWorkIn

EXEC addCKCustomers
EXEC undoCKCustomers

EXEC removeFKDeliveries
EXEC addFKDeliveries

EXEC addAccessories
EXEC undoAccessories

-- Second part of the homework
-- create a new table that keeps only the current version (the version is an integer number)
CREATE TABLE Current_Version (
	currentVersion int default 0)

INSERT INTO Current_Version(currentVersion) VALUES (0)
SELECT * FROM Current_Version

-- create a new table that holds the version of the database schema (the version is an integer number)
CREATE TABLE Procedure_Table (
	proTabID int primary key identity,
	firstProcedure varchar(100),
	secondProcedure varchar(100))

INSERT INTO Procedure_Table(firstProcedure, secondProcedure) VALUES ('modifyRate', 'undoRate')
INSERT INTO Procedure_Table(firstProcedure, secondProcedure) VALUES ('addStoName', 'undoStoName')
INSERT INTO Procedure_Table(firstProcedure, secondProcedure) VALUES ('defaultRate', 'undoRateDefault')
INSERT INTO Procedure_Table(firstProcedure, secondProcedure) VALUES ('removePKWorkIn', 'addPKWorkIn')
INSERT INTO Procedure_Table(firstProcedure, secondProcedure) VALUES ('addCKCustomers', 'undoCKCustomers')
INSERT INTO Procedure_Table(firstProcedure, secondProcedure) VALUES ('removeFKDeliveries', 'addFKDeliveries')
INSERT INTO Procedure_Table(firstProcedure, secondProcedure) VALUES ('addAccessories', 'undoAccessories')
SELECT * FROM Procedure_Table

-- Third part of the homework
-- write a stored procedure that receives as a parameter a version number and brings the database to that version
GO
CREATE OR ALTER PROCEDURE goToVersion(@version int)
AS
BEGIN
	DECLARE @currentVersion int
	-- 1. validate the parameter (version should be between 0 and 7, otherwise print an error)
	IF @version < 0 OR @version > 7
		BEGIN
			RAISERROR ('ERROR: Version must be greater than 0 and smaller than 7!', 10, 1)
			RETURN
		END
	ELSE
		BEGIN
			DECLARE @currentProcedure VARCHAR(100) 
			-- 2. extract the current version of your database from the version table
			SET @currentVersion = (SELECT currentVersion FROM Current_Version)

			-- 3. compare the current version of the database to the version in which you want to take your own database
			IF @currentVersion < @version 
				BEGIN 
					PRINT 'DIRECT'
					WHILE @currentVersion < @version 
						BEGIN
							-- execute the direct stored procedures
							PRINT 'The current version is: ' + CAST(@currentVersion AS varchar(10)) + ' where version is: ' + CAST(@version AS varchar(10))

							-- tip: proTabID = @currentVersion + 1 because the first version is 0 
							-- tip: the first procedure is in the second row of the table
							SET @currentProcedure = ( SELECT firstProcedure FROM Procedure_Table 
													  WHERE proTabID = @currentVersion + 1 )

							PRINT 'Procedure to be executed is ' + @currentProcedure

							EXEC (@currentProcedure)
							PRINT CHAR(13)
							-- tip: update the current version for executing the second procedure of the next version
							SET @currentVersion = @currentVersion + 1
						END
				END
			ELSE
				IF @currentVersion > @version 
					BEGIN
						PRINT 'REVERSE'
						WHILE @currentVersion > @version 
							BEGIN
								-- execute the reverse stored procedures
								PRINT 'The current version is: ' + CAST(@currentVersion AS varchar(10)) + ' where version is: ' + CAST(@version AS varchar(10))

								-- tip: the second procedure of the current version is the first procedure of the previous version  
								-- tip: not the first procedure of the current version
								SET @currentProcedure = ( SELECT secondProcedure FROM Procedure_Table 
														  WHERE proTabID = @currentVersion )
								
								PRINT 'Procedure to be executed is ' + @currentProcedure

								EXEC (@currentProcedure)
								PRINT CHAR(13)
								-- tip: update the current version for executing the first procedure of the previous version
								SET @currentVersion = @currentVersion - 1
							END
					END
				ELSE
					IF @version = @currentVersion
						BEGIN
							-- print a corresponfing message
							PRINT 'You are already on this version, because ' + CAST(@currentVersion AS varchar(10)) + ' = ' + CAST(@version AS varchar(10))
							RETURN
						END

			-- 4. update the new version in the version table
			UPDATE Current_Version SET currentVersion = @currentVersion
			PRINT 'The current version has been updated to: ' + CAST(@currentVersion AS varchar(10))
		END
END

EXEC goToVersion 3
EXEC goToVersion 7
EXEC goToVersion 5
EXEC goToVersion 2
EXEC goToVersion 0
EXEC goToVersion -1
EXEC goToVersion 8