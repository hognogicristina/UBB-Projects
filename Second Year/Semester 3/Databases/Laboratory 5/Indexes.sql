GO
USE AppleStore
GO

-- Ta(aid, a2, ...): Customers(cusID, cusPhoneNr, cusPoints ...) - where cusID = PK, cusPhoneNr = INT UNIQUE and cusPoints = INT (for key loop)
-- Tb(bid, b2, ...): Products(proID, proRate, ...) - where proID = PK and proRate = INT
-- Tc(cid, aid, bid, ...): Orders(ordID, cusID, proID, ...) - where ordID = PK, cusID = FK and proID = FK

/*
OBS: 
- We have a clustered index automatically created for the cusID column from Customers
- We have a unique non-clustered index automatically created for the cusPhoneNr column from Customers
- We have a clustered index automatically created for the bid column from Tb
- We have a clustered index automatically created for the cid column from Tc
*/

-- a. Write queries on Ta such that their execution plans contain the following operators:

-- clustered index scan - scan the entire table
-- cost: 0.0032897
SELECT * FROM Customers
ORDER BY cusID

-- clustered index seek - return a specific subset of rows from a clustered index
-- cost: 0.0032875
SELECT * FROM Customers
WHERE cusID > 2

-- non-clustered index scan - scan the entire non-clustered index
-- cost: 0.0032897
SELECT cusPhoneNr FROM Customers
ORDER BY cusPhoneNr

-- non-clustered index seek - return a specific subset of rows from a non-clustered index
-- cost: 0.0032853
SELECT cusPhoneNr FROM Customers
WHERE cusPhoneNr IN (756984132, 793467897, 711136910)

-- key lookup 
-- non-clustered index seek and key lookup - the data is found in a non-clustered index, but additional data is needed
-- cost: 0.0073873
SELECT cusPoints, cusPhoneNr FROM Customers
WHERE cusPoints BETWEEN 10 AND 100
ORDER BY cusPoints

-- b. Write a query on table Products with a WHERE clause of the form WHERE proRate = value and analyze its execution plan. 
-- Create a non-clustered index that can speed up the query. Examine the execution plan again.

-- a clustered index seek 
-- cost: 0.0069237
SELECT * FROM Products
WHERE proRate = 3

-- a non-clustered index seek 
-- cost: 0.0069237
CREATE NONCLUSTERED INDEX Products_proRate_index ON Products(proRate)

-- c. Create a view that joins at least 2 tables. 
-- Check whether existing indexes are helpful; if not, reassess existing indexes/ examine the cardinality of the tables.
GO
CREATE OR ALTER VIEW allJoin 
AS 
	SELECT C.cusID, P.proID, O.ordID
	FROM Orders O 
	INNER JOIN Customers C ON C.cusID = O.cusID
	INNER JOIN Products P ON P.proID = O.proID
	WHERE P.proRate > 0 AND C.cusPoints < 200
GO

-- the automatically created ones
-- cost: 0.0124573
SELECT * FROM allJoin

-- the automatically created ones and a non-clustered index on proRate 
-- cost: 0.0124573
SELECT * FROM allJoin

-- the automatically created ones, a non-clustered index on proRate and a non-clustered index on cusPoints
-- cost: 0.0124573
CREATE NONCLUSTERED INDEX Customers_cusPoints_index ON Customers(cusPoints)
SELECT * FROM allJoin

-- the automatically created ones and a non-clustered index on cusPoints
-- cost: 0.0124573
DROP INDEX Products_proRate_index ON Products
SELECT * FROM allJoin

-- automatically created indexes, a non-clustered index on proRate and a non-clustered index on (cusID, proID) from Orders
-- cost: 0.0124573
CREATE NONCLUSTERED INDEX Orders_index ON Orders(cusID, proID)
DROP INDEX Customers_cusPoints_index ON Customers
SELECT * FROM allJoin

-- the automatically created ones, a non-clustered index on cusPoints and a non-clustered index on (cusID, proID) from Orders
-- cost: 0.0121511
SELECT * FROM allJoin

-- automatically created indexes and a non-clustered index on (cusID, proID) from Orders
-- cost: 0.0121544
SELECT * FROM allJoin

-- automatically created indexes, a non-clustered index on proRate, a non-clustered index on cusPoints
-- and a non-clustered index on (cusID, proID) from Orders
-- cost: 0.121511
SELECT * FROM allJoin
DROP INDEX Orders_index ON Orders