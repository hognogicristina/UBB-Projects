USE AppleStore
GO

--part 1
INSERT INTO Categories(catID, catName) VALUES(2, 'MacBook')
BEGIN TRAN
WAITFOR DELAY '00:00:04'
UPDATE Categories
SET catName = 'iMac'
WHERE catID = 2
COMMIT TRAN