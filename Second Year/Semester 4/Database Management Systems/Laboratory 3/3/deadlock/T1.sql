USE AppleStore
GO

-- SELECT * FROM Categories
-- SELECT * FROM Colour
-- INSERT INTO Categories(catID, catName) VALUES(20, 'AirPods')
-- INSERT INTO Colour(colID, colName) VALUES(20, 'Red')

-- UPDATE Colour SET colName = 'Red' WHERE colID = 20
-- UPDATE Categories SET catName = 'AirPods' WHERE catID = 20

-- part 1
BEGIN TRAN
-- exclusive look on table Categories
UPDATE Categories SET catName = 'Transaction 1' WHERE catID = 20
WAITFOR DELAY '00:00:10'

-- this transaction will be blocked, because T2 already has an exclusive lock on Colour
UPDATE Colour SET colName = 'Transaction 1' WHERE colID = 20
COMMIT TRAN