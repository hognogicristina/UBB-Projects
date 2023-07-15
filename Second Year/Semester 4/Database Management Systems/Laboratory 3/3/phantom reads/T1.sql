USE AppleStore
GO

-- DELETE FROM Categories WHERE catID = 3
-- SELECT * FROM Categories

-- part 1
BEGIN TRAN
WAITFOR DELAY '00:00:06'
INSERT INTO Categories(catID, catName) VALUES(3, 'Watch')
COMMIT TRAN