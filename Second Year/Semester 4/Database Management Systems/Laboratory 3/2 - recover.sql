USE AppleStore
GO

CREATE OR ALTER PROCEDURE uspAddCategoriesRecover(@catID integer, @catName VARCHAR(30))
AS
	SET NOCOUNT ON
	BEGIN TRAN
	BEGIN TRY
		IF (dbo.ufValidateString(@catName) <> 1)
		BEGIN
			RAISERROR('Categrory is invalid', 14, 1)
		END
		IF EXISTS (SELECT * FROM Categories C where C.catID = @catID)
		BEGIN
			RAISERROR('Category already exists', 14, 1)
		END
		INSERT INTO Categories VALUES (@catID, @catName)
		INSERT INTO LogTable VALUES ('add', 'category', GETDATE())
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN
	END CATCH
GO

CREATE OR ALTER PROCEDURE uspAddColourRecover(@colID integer, @colName VARCHAR(30))
AS
	SET NOCOUNT ON
	BEGIN TRAN
	BEGIN TRY
		IF (dbo.ufValidateString(@colName) <> 1)
		BEGIN
			RAISERROR('Cplour is invalid', 14, 1)
		END
		IF EXISTS (SELECT * FROM Colour CC where CC.colID = @colID)
		BEGIN
			RAISERROR('Colour already exists', 14, 1)
		END
		INSERT INTO Colour VALUES (@colID, @colName)
		INSERT INTO LogTable VALUES ('add', 'colour', GETDATE())
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN
	END CATCH
GO

		
CREATE OR ALTER PROCEDURE uspAddAvailable_CategoriesRecover(@catID integer, @colID integer)
AS
	SET NOCOUNT ON
	BEGIN TRAN
	BEGIN TRY
		IF EXISTS (SELECT * FROM Available_Categories AV where AV.catID = @catID AND AV.colID = @colID)
		BEGIN
			RAISERROR('Available Categories already exists', 14, 1)
		END
		INSERT INTO Available_Categories VALUES (@catID, @colID)
		INSERT INTO LogTable VALUES ('add', 'available_categories', GETDATE())
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN
	END CATCH
GO

CREATE OR ALTER PROCEDURE uspBadAddScenario
AS
	EXEC uspAddCategoriesRecover 5, 'AirPods'
	EXEC uspAddColourRecover 5, 'g' -- this will fail, but the item added before will still be in the database
	EXEC uspAddAvailable_CategoriesRecover 5, 5
GO

CREATE OR ALTER PROCEDURE uspGoodAddScenario
AS
	EXEC uspAddCategoriesRecover 5, 'Watch'
	EXEC uspAddColourRecover 5, 'Pink'
	EXEC uspAddAvailable_CategoriesRecover 5, 5
GO

EXEC uspBadAddScenario
SELECT * FROM LogTable

EXEC uspGoodAddScenario
SELECT * FROM LogTable

SELECT * FROM Categories
SELECT * FROM Colour
SELECT * FROM Available_Categories

DELETE FROM Categories WHERE catID = 5
DELETE FROM Colour WHERE colID = 5
DELETE FROM Available_Categories WHERE catID = 5 AND colID = 5
