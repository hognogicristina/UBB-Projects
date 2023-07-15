USE AppleStore
GO

-- solution: set transaction isolation level to serializable
SET TRAN ISOLATION LEVEL SERIALIZABLE
BEGIN TRAN
SELECT * FROM Categories
WAITFOR DELAY '00:00:06'
SELECT * FROM Categories
COMMIT TRAN