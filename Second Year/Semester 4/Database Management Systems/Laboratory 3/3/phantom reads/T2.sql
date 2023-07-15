USE AppleStore
GO

-- part 2: phantom read - because T1 has generated a new row while T2 is executing, we will get an extra row in the second select
SET TRAN ISOLATION LEVEL REPEATABLE READ
BEGIN TRAN
-- inserted value does not exist yet
SELECT * FROM Categories
WAITFOR DELAY '00:00:06'
-- we can see the inserted value during the second read
SELECT * FROM Categories
COMMIT TRAN