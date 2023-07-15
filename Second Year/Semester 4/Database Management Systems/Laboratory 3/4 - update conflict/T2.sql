USE AppleStore
GO

-- update conflict
SET TRAN ISOLATION LEVEL SNAPSHOT
BEGIN TRAN

WAITFOR DELAY '00:00:05'

-- T1 has now updated and obtained a lock on this table
-- trying to update the same row will result in a error (process is blocked)
UPDATE Categories SET catName = 'iMac' WHERE catID = 20
COMMIT TRAN