USE AppleStore
GO

-- part 1
BEGIN TRAN
UPDATE Categories
SET catName = 'Apple TV'
WHERE catID = 7
WAITFOR DELAY '00:00:06'
ROLLBACK TRAN