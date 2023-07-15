USE AppleStore
GO

-- part 2; we can read uncommited data (dirty read)
SET TRAN ISOLATION LEVEL READ UNCOMMITTED
BEGIN TRAN
-- see update
SELECT * FROM Categories
WAITFOR DELAY '00:00:06'
-- update was rolled back
SELECT * FROM Categories
COMMIT TRAN

-- UPDATE Categories SET catName = 'Apple TV' WHERE catID = 7