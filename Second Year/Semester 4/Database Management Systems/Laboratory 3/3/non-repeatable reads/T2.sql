USE AppleStore
GO

--part 2: the row is changed while T2 is in progress, so we will se both values for address
SET TRAN ISOLATION LEVEL READ COMMITTED
BEGIN TRAN
-- see first insert
SELECT * FROM Categories
WAITFOR DELAY '00:00:06'
SELECT * FROM Categories
COMMIT TRAN

-- DELETE FROM Categories WHERE catID = 2