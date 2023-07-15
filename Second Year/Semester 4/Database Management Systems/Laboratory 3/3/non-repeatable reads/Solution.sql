USE AppleStore
GO

--solution: set transaction isolation level to repeatable read
SET TRAN ISOLATION LEVEL REPEATABLE READ
BEGIN TRAN
SELECT * FROM Categories
WAITFOR DELAY '00:00:06'
-- now we see the value before the update
SELECT * FROM Categories
COMMIT TRAN

-- DELETE FROM Categories WHERE catID = 2