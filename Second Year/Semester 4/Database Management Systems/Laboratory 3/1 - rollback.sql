USE AppleStore
GO

DROP TABLE IF EXISTS LogTable 
CREATE TABLE LogTable(
	Lid INT IDENTITY PRIMARY KEY,
	TypeOperation VARCHAR(50),
	TableOperation VARCHAR(50),
	ExecutionDate DATETIME
);

GO

-- use m:n relation Categories - Colour
CREATE OR ALTER FUNCTION ufValidateString (@str VARCHAR(30))
RETURNS INT
AS
BEGIN
	DECLARE @return INT
	SET @return = 1
	IF(@str IS NULL OR LEN(@str) < 2 OR LEN(@str) > 30)
	BEGIN
		SET @return = 0
	END
	RETURN @return
END
GO

CREATE OR ALTER FUNCTION ufValidateInt (@int integer)
RETURNS INT
AS
BEGIN
	DECLARE @return INT
	SET @return = 1
	IF(@int < 0)
	BEGIN
		SET @return = 0
	END
	RETURN @return
END
GO

CREATE OR ALTER PROCEDURE uspAddCategories(@catID INTEGER, @catName VARCHAR(30))
AS
	SET NOCOUNT ON
	IF (dbo.ufValidateString(@catName) <> 1)
	BEGIN
		RAISERROR('Category is invalid', 14, 1)
	END
	IF EXISTS (SELECT * FROM Categories C WHERE C.catID = @catID)
	BEGIN
		RAISERROR('Categories already exists', 14, 1)
	END
	INSERT INTO Categories VALUES (@catID, @catName)
	INSERT INTO LogTable VALUES ('add', 'category', GETDATE())
GO

CREATE OR ALTER PROCEDURE uspAddColour(@colID INTEGER, @colName VARCHAR(30))
AS
	SET NOCOUNT ON
	IF (dbo.ufValidateString(@colName) <> 1)
	BEGIN
		RAISERROR('Colour is invalid', 14, 1)
	END
	IF EXISTS (SELECT * FROM Colour CC where CC.colID = @colID)
	BEGIN
		RAISERROR('Colour already exists', 14, 1)
	END
	INSERT INTO Colour VALUES (@colID, @colName)
	INSERT INTO LogTable VALUES ('add', 'colour', GETDATE())
GO
		
CREATE OR ALTER PROCEDURE uspAddAvailable_Categories(@catID INTEGER, @colID INTEGER)
AS
	SET NOCOUNT ON
	IF EXISTS (SELECT * FROM Available_Categories AC where AC.catID = @catID AND AC.colID = @colID)
	BEGIN
		RAISERROR('Available_Categories already exists', 14, 1)
	END
	INSERT INTO Available_Categories VALUES (@catID, @colID)
	INSERT INTO LogTable VALUES ('add', 'available_categories', GETDATE())
GO

CREATE OR ALTER PROCEDURE uspAddCommitScenario
AS
	BEGIN TRAN
	BEGIN TRY
		EXEC uspAddCategories 5, 'Airpods'
		EXEC uspAddColour 5, 'Pink'
		EXEC uspAddAvailable_Categories 5, 5
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN
		RETURN
	END CATCH
GO


CREATE OR ALTER PROCEDURE uspAddRollbackScenario
AS 
	BEGIN TRAN
	BEGIN TRY
		EXEC uspAddCategories 2, 'iPad'
		EXEC uspAddColour 2, 'o' -- this will fail due to validation, so everything fails
		EXEC uspAddAvailable_Categories 6, 6
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN
		RETURN
	END CATCH
GO

EXEC uspAddRollbackScenario
EXEC uspAddCommitScenario

SELECT * FROM LogTable

SELECT * FROM Categories
SELECT * FROM Colour
SELECT * FROM Available_Categories

DELETE FROM Categories WHERE catID = 6
DELETE FROM Colour WHERE colID = 6
DELETE FROM Available_Categories WHERE catID = 6 AND colID = 6