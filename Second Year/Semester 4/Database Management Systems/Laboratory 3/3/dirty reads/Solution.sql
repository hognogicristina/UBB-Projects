USE AppleStore
GO

--SOLUTION: set transaction isolation level to read commited
SET TRAN ISOLATION LEVEL READ COMMITTED
BEGIN TRAN
SELECT * FROM Categories
WAITFOR DELAY '00:00:06'
SELECT * FROM Categories
COMMIT TRAN