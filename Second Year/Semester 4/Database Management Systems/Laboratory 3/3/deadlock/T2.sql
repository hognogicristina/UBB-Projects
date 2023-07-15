USE AppleStore
GO

-- SELECT * FROM Categories
-- SELECT * FROM Colour

-- part 1
BEGIN TRAN
-- exclusive lock on Colour
UPDATE Colour SET colName = 'Transaction 2' WHERE colID = 20
WAITFOR DELAY '00:00:10'

-- this transaction will be blocked, because T1 already has an exclusive lock on Categories
UPDATE Categories SET catName = 'Transaction 2' WHERE catID = 20
COMMIT TRAN

-- this transaction will be chosen as the deadlock victim
-- and it will terminate with an error
-- the tables will contain the values from T1
