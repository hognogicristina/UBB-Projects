USE AppleStore
GO

-- solution: set deadlock priority to high for the second transaction
-- now, T1 will be chosen as the deadlock victim, as it has a lower priority
-- default priority is normal (0)

SET DEADLOCK_PRIORITY HIGH
BEGIN TRAN
-- exclusive lock on table Colour
UPDATE Colour SET colName = 'Transaction 2' WHERE colID = 20
WAITFOR DELAY '00:00:10'

UPDATE Categories SET catName = 'Transaction 2' WHERE catID = 20
COMMIT TRAN

