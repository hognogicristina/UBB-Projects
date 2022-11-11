USE AppleStore

-- INSERT STATEMENTS
INSERT INTO Categories(catName) VALUES ('MacBook')
INSERT INTO Categories(catName) VALUES ('iPad')
INSERT INTO Categories(catName) VALUES ('iPhone')
INSERT INTO Categories(catName) VALUES ('Watch')
INSERT INTO Categories(catName) VALUES ('AirPods')
INSERT INTO Categories(catName) VALUES ('iMac')

INSERT INTO Model(catID, modName) VALUES (1, 'Air')
INSERT INTO Model(catID, modName) VALUES (1, 'Pro')
INSERT INTO Model(catID, modName) VALUES (2, 'Air')
INSERT INTO Model(catID, modName) VALUES (2, 'Pro')
INSERT INTO Model(catID, modName) VALUES (2, 'Mini')
INSERT INTO Model(catID, modName) VALUES (3, 'Pro')
INSERT INTO Model(catID, modName) VALUES (3, 'Mini')
INSERT INTO Model(catID, modName) VALUES (3, 'Max')
INSERT INTO Model(catID, modName) VALUES (4, 'Series 1')
INSERT INTO Model(catID, modName) VALUES (4, 'Series 2')
INSERT INTO Model(catID, modName) VALUES (5, 'Pro')
INSERT INTO Model(catID, modName) VALUES (5, 'Max')

INSERT INTO Colour(colName) VALUES ('Red')
INSERT INTO Colour(colName) VALUES ('Orange')
INSERT INTO Colour(colName) VALUES ('Blue')
INSERT INTO Colour(colName) VALUES ('Black')
INSERT INTO Colour(colName) VALUES ('Pink')
INSERT INTO Colour(colName) VALUES ('White')
INSERT INTO Colour(colName) VALUES ('Yellow')
INSERT INTO Colour(colName) VALUES ('Green')

INSERT INTO Available_Model(colID, modID) VALUES (1, 1)
INSERT INTO Available_Model(colID, modID) VALUES (2, 2)
INSERT INTO Available_Model(colID, modID) VALUES (3, 3)
INSERT INTO Available_Model(colID, modID) VALUES (4, 4)
INSERT INTO Available_Model(colID, modID) VALUES (5, 5)
INSERT INTO Available_Model(colID, modID) VALUES (6, 6)

INSERT INTO Available_Categories(colID, catID) VALUES (1, 1)
INSERT INTO Available_Categories(colID, catID) VALUES (2, 2)
INSERT INTO Available_Categories(colID, catID) VALUES (3, 3)
INSERT INTO Available_Categories(colID, catID) VALUES (4, 4)
INSERT INTO Available_Categories(colID, catID) VALUES (5, 5)

INSERT INTO Stores(stoLoc) VALUES ('Bucharest')
INSERT INTO Stores(stoLoc) VALUES ('Dublin')
INSERT INTO Stores(stoLoc) VALUES ('Paris')
INSERT INTO Stores(stoLoc) VALUES ('Rome')
INSERT INTO Stores(stoLoc) VALUES ('Amsterdam')
INSERT INTO Stores(stoLoc) VALUES ('Prague')
INSERT INTO Stores(stoLoc) VALUES ('Vienna')

INSERT INTO Products(modID, colID, proName, proDescription, proRate) VALUES (1, 3, 'MacBook Air Blue', 'MacBook Air is an incredibly portable laptop — it’s nimble and quick, with a silent, fanless design and a beautiful Retina display.', 2)
INSERT INTO Products(modID, colID, proName, proDescription) VALUES (1, 1, 'MacBook Air Red', 'MacBook Air is an incredibly portable laptop — it’s nimble and quick, with a silent, fanless design and a beautiful Retina display.')
INSERT INTO Products(modID, colID, proName, proDescription, proRate) VALUES (2, 5, 'MacBook Pro Pink', 'MacBook Pro has the compact design supports up to 20 hours of battery life and an active cooling system to sustain enhanced performance.', 5)
INSERT INTO Products(modID, colID, proName, proDescription, proRate) VALUES (2, 4, 'MacBook Pro Black', 'MacBook Pro has the compact design supports up to 20 hours of battery life and an active cooling system to sustain enhanced performance.', 3)
INSERT INTO Products(modID, colID, proName, proDescription) VALUES (3, 2, 'iPad Air Orange', 'iPad Air lets you immerse yourself in whatever you’re reading, watching, or creating.')
INSERT INTO Products(modID, colID, proName, proDescription, proRate) VALUES (3, 3, 'iPad Air Blue', 'iPad Air lets you immerse yourself in whatever you’re reading, watching, or creating.', 1)
INSERT INTO Products(modID, colID, proName, proDescription, proRate) VALUES (4, 2, 'iPad Pro Orange', 'Astonishing performance. Incredibly advanced displays. Superfast wireless connectivity.', 3)
INSERT INTO Products(modID, colID, proName, proDescription, proRate) VALUES (5, 5, 'iPad Mini Pink', 'iPad mini is meticulously designed to be absolutely beautiful. Larger edge-to-edge screen, along with narrow borders and elegant rounded corners.', 2)
INSERT INTO Products(modID, colID, proName, proDescription, proRate) VALUES (5, 6, 'iPad Mini White', 'iPad mini is meticulously designed to be absolutely beautiful. Larger edge-to-edge screen, along with narrow borders and elegant rounded corners.', 5)
INSERT INTO Products(modID, colID, proName, proDescription, proRate) VALUES (6, 4, 'iPhone Pro Black', 'A magical new way to interact with iPhone. Groundbreaking safety features designed to save lives. An innovative 48MP camera for mind-blowing detail.', 4)
INSERT INTO Products(modID, colID, proName, proDescription) VALUES (6, 6, 'iPhone Pro White', 'A magical new way to interact with iPhone. Groundbreaking safety features designed to save lives. An innovative 48MP camera for mind-blowing detail.')
INSERT INTO Products(modID, colID, proName, proDescription) VALUES (7, 1, 'iPhone Mini Red', 'A magical new way to interact with iPhone. Groundbreaking safety features designed to save lives. An innovative 48MP camera for mind-blowing detail.')
INSERT INTO Products(modID, colID, proName, proDescription, proRate) VALUES (8, 2, 'iPhone Max Orange', 'A magical new way to interact with iPhone. Groundbreaking safety features designed to save lives. An innovative 48MP camera for mind-blowing detail.', 1)
INSERT INTO Products(modID, colID, proName, proDescription, proRate) VALUES (9, 4, 'Watch Series 1 Black', 'Powerful sensors for insights about your health and fitness. Innovative safety features. Convenient ways to stay connected.', 2)
INSERT INTO Products(modID, colID, proName, proDescription, proRate) VALUES (10, 6, 'Watch Series 2 White', 'Powerful sensors for insights about your health and fitness. Innovative safety features. Convenient ways to stay connected.', 4)
INSERT INTO Products(modID, colID, proName, proDescription, proRate) VALUES (11, 1, 'AirPods Pro Red', 'With plenty of talk and listen time, voice-activated Siri access, and an available wireless charging case, AirPods deliver an incredible wireless headphone experience.', 2)
INSERT INTO Products(modID, colID, proName, proDescription) VALUES (12, 3, 'AirPods Max Blue', 'AirPods Max is a perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods. The ultimate personal listening experience is here.')

INSERT INTO Employee(catID, empName, empSalary, empWork, empJob, empExperience) VALUES (1, 'Andreea', 7000, 7, 'Advertising & Marketing Manager', 80)
INSERT INTO Employee(catID, empName, empSalary, empWork, empJob, empExperience) VALUES (2, 'Cosmina', 4500, 9, 'Cleaning & Maintenance', 60)
INSERT INTO Employee(catID, empName, empSalary, empWork, empJob, empExperience) VALUES (3, 'Iulia', 5000, 6, 'Visual Merchandiser', 65)
INSERT INTO Employee(catID, empName, empSalary, empWork, empJob, empExperience) VALUES (4, 'Alexandra', 3500, 5, 'Cleaning & Maintenance', 40)
INSERT INTO Employee(catID, empName, empSalary, empWork, empJob, empExperience) VALUES (5, 'Vasile', 4000, 9, 'Sales Associate', 50)
INSERT INTO Employee(catID, empName, empSalary, empWork, empJob, empExperience) VALUES (1, 'Cristian', 3000, 7, 'Sales Associate', 35)
INSERT INTO Employee(catID, empName, empSalary, empWork, empJob, empExperience) VALUES (2, 'Florin', 10000, 4, 'Store Manager', 100)
INSERT INTO Employee(catID, empName, empSalary, empWork, empJob, empExperience) VALUES (3, 'Ana', 2500, 7, 'Sales Associate', 25)
INSERT INTO Employee(catID, empName, empSalary, empWork, empJob, empExperience) VALUES (4, 'Maria', 1000, 8, 'Visual Merchandiser', 20)
INSERT INTO Employee(catID, empName, empSalary, empWork, empJob, empExperience) VALUES (5, 'Olivia', 5500, 8, 'Sales Associate', 70)

INSERT INTO Work_In(stoID, empID) VALUES (1, 1)
INSERT INTO Work_In(stoID, empID) VALUES (2, 2)
INSERT INTO Work_In(stoID, empID) VALUES (2, 3)
INSERT INTO Work_In(stoID, empID) VALUES (3, 4)
INSERT INTO Work_In(stoID, empID) VALUES (1, 5)
INSERT INTO Work_In(stoID, empID) VALUES (2, 6)
INSERT INTO Work_In(stoID, empID) VALUES (2, 8)
INSERT INTO Work_In(stoID, empID) VALUES (3, 7)
INSERT INTO Work_In(stoID, empID) VALUES (3, 10)
INSERT INTO Work_In(stoID, empID) VALUES (1, 9)

INSERT INTO Customers(cusName, cusPhoneNr, cusAdrres) VALUES ('Cristina', 757602354, 'Str Plopilor, Nr 77')
INSERT INTO Customers(cusName, cusPhoneNr, cusAdrres) VALUES ('Edward', 759743685, 'Str Vladimir, Nr 12')
INSERT INTO Customers(cusName, cusPhoneNr, cusAdrres) VALUES ('Florin', 711136910, 'Str Lalelelor, Nr 56')
INSERT INTO Customers(cusName, cusPhoneNr, cusAdrres) VALUES ('Alina', 726138997, 'Str Victoriei, Nr 4')
INSERT INTO Customers(cusName, cusAdrres) VALUES ('Olivia', 'Str Decebal, Nr 97')
INSERT INTO Customers(cusName, cusPhoneNr, cusAdrres) VALUES ('Iulia', 756984123, 'Str Decebal, Nr 9')
INSERT INTO Customers(cusName, cusPhoneNr, cusAdrres) VALUES ('Alexandra', 736589423, 'Str Artarilor, Nr 2')

INSERT INTO Orders(cusID, proID, ordDate) VALUES (1, 10, '2022-02-10')
INSERT INTO Orders(cusID, proID, ordDate) VALUES (1, 15, '2022-02-10')
INSERT INTO Orders(cusID, proID, ordDate) VALUES (1, 7, '2022-02-10')
INSERT INTO Orders(cusID, proID, ordDate) VALUES (2, 1, '2022-12-01')
INSERT INTO Orders(cusID, proID, ordDate) VALUES (3, 16, '2022-10-19')
INSERT INTO Orders(cusID, proID, ordDate) VALUES (3, 8, '2022-10-19')
INSERT INTO Orders(cusID, proID, ordDate) VALUES (3, 5, '2022-10-19')
INSERT INTO Orders(cusID, proID, ordDate) VALUES (4, 17, '2022-11-30')
INSERT INTO Orders(cusID, proID, ordDate) VALUES (5, 14, '2022-12-01')

INSERT INTO Payment(ordID, payDate, payType) VALUES (1, '2022-02-10', 'Card')
INSERT INTO Payment(ordID, payDate, payType) VALUES (2, '2022-02-10', 'Card')
INSERT INTO Payment(ordID, payDate, payType) VALUES (3, '2022-02-10', 'Card')
INSERT INTO Payment(ordID, payDate, payType) VALUES (4, '2022-12-01', 'Cash')
INSERT INTO Payment(ordID, payDate, payType) VALUES (5, '2022-10-19', 'Cash')
INSERT INTO Payment(ordID, payDate, payType) VALUES (6, '2022-10-19', 'Cash')
INSERT INTO Payment(ordID, payDate, payType) VALUES (7, '2022-10-19', 'Cash')
INSERT INTO Payment(ordID, payDate, payType) VALUES (8, '2022-11-30', 'Cash')
INSERT INTO Payment(ordID, payDate, payType) VALUES (9, '2022-12-01', 'Cash')

INSERT INTO Deliveries(ordID, delDate) VALUES (1, '2022-02-10')
INSERT INTO Deliveries(ordID, delDate) VALUES (2, '2022-02-10')
INSERT INTO Deliveries(ordID, delDate) VALUES (3, '2022-02-10')
INSERT INTO Deliveries(ordID, delDate) VALUES (4, '2022-12-04')
INSERT INTO Deliveries(ordID, delDate) VALUES (5, '2022-10-20')
INSERT INTO Deliveries(ordID, delDate) VALUES (6, '2022-10-20')
INSERT INTO Deliveries(ordID, delDate) VALUES (7, '2022-10-20')
INSERT INTO Deliveries(ordID, delDate) VALUES (8, '2022-12-15')
INSERT INTO Deliveries(ordID, delDate) VALUES (9, '2022-12-10')

SELECT * FROM Categories
SELECT * FROM Model
SELECT * FROM Colour
SELECT * FROM Stores
SELECT * FROM Products
SELECT * FROM Employee
SELECT * FROM Work_In
SELECT * FROM Customers
SELECT * FROM Orders
SELECT * FROM Payment
SELECT * FROM Deliveries

-- UPDATE STATEMENTS
-- used: LIKE/ OR/ >
UPDATE Payment
SET payDate = '2022-12-02'
WHERE payDate LIKE '%1' OR ordID > 7
SELECT * FROM Payment

-- used: IS NULL
UPDATE Customers
SET cusPhoneNr = 793467897 
WHERE cusPhoneNr IS NULL 
SELECT * FROM Customers

-- used: IN/ AND/ BETWEEN
UPDATE Customers
SET cusPhoneNr = cusPhoneNr + 9
WHERE cusName IN ('Cristina', 'Olivia', 'Iulia') AND cusPhoneNr BETWEEN 750000000 AND 760000000
SELECT * FROM Customers

-- used: >=/ AND/ <=
UPDATE Payment
SET payType = 'Card'
WHERE ordID >= 5 AND ordID <= 8
SELECT * FROM Payment

-- used: IS NOT NULL
UPDATE Products
SET proRate = proRate + 1 
WHERE proRate IS NOT NULL
SELECT * FROM Products

-- DELETE STATEMENTS
INSERT INTO Customers(cusName, cusPhoneNr, cusAdrres) VALUES ('Ioana', 736339423, 'Str Vlahutei, Nr 21')
SELECT * FROM Customers
DELETE FROM Customers
WHERE cusName LIKE '%ana' 
SELECT * FROM Customers

-- used: LIKE/ AND/ =
INSERT INTO Deliveries(ordID, delDate) VALUES (4, '2022-05-10')
SELECT * FROM Deliveries
DELETE FROM Deliveries
WHERE delDate LIKE '%5%' AND ordID = 4 
SELECT * FROM Deliveries

-- QUERIES STATEMENTS
-- a1. Find the employee that have the name starting with A or are working for AirPods.
-- used: UNION [ALL]
SELECT e1.empName
FROM Employee e1
WHERE empName LIKE 'A%'
UNION ALL 
SELECT e2.empName
FROM Employee e2
WHERE catID = 5

-- a2. Find all delivery dates that consists 1 or the first order is not included.
-- used: DISTINCT
-- used: OR
SELECT DISTINCT d.delDate 
FROM Deliveries d
WHERE delDate LIKE '%1%' OR ordID > 3

-- b1. Find all employees that are also customers.
-- used: INTERSECT
SELECT e.empName
FROM Employee e
INTERSECT
SELECT c.cusName
FROM Customers c

-- b2. Find all employees that are also customers.
-- used: DISTINCT
-- used: IN
SELECT DISTINCT e.empName 
FROM Employee e 
WHERE e.empName IN ( SELECT c.cusName 
		     FROM Customers c )

-- c1. Find all blue devices that are not from a specific model, exemple iPad.
-- used: EXCEPT
SELECT p.proName
FROM Products p
WHERE colID = 3
EXCEPT 
SELECT p.proName
FROM Products p
WHERE modID BETWEEN 3 AND 5

-- c2. Find all blue devices that are not from a specific model, exemple iPad.
-- used: NOT IN
SELECT p.proName
FROM Products p
WHERE colID = 3 AND modID NOT IN (3, 5) 

-- d1. Find all the products that belong to 2 specific models, exemple Pro model or Max model.
 -- used: OR
SELECT p.proName, m.modName
FROM Products p INNER JOIN Model m ON p.modID = m.modID
WHERE m.modName = 'Pro' OR m.modName = 'Max'
ORDER BY m.modName DESC

-- d2. Find all order dates and their payment and delivery dates, including payments and deliveries that are not done yet.
-- used: 3 tables
-- used: DISTINCT
SELECT DISTINCT o.ordDate, p.payDate, d.delDate 
FROM Orders o 
LEFT JOIN Payment p ON o.ordDate = p.payDate
LEFT JOIN Deliveries d ON o.ordDate = d.delDate

-- d3. Find all stores and employees that work in, include stores that don't have any employees yet.
-- used: ORDER BY
-- used: TOP
SELECT TOP 5 e.empName, s.stoLoc
FROM Employee e
RIGHT JOIN Work_In w ON w.empID = e.empID
RIGHT JOIN Stores s ON s.stoID = w.stoID
ORDER BY s.stoLoc DESC 

-- d4. Find all models that are available in at least one colour, include categories that are not of that colour.
-- used: at least two many-to-many relantionships
-- used: ORDER BY
-- used: TOP
SELECT TOP 10 m.modName, c1.colName, c2.catName 
FROM Model m
FULL JOIN Available_Model am ON am.modID = m.modID 
FULL JOIN Colour c1 ON c1.colID = am.colID
FULL JOIN Available_Categories ac ON ac.colID = c1.colID
FULL JOIN Categories c2 ON c2.catID = ac.catID
ORDER BY m.modName 

-- e1. Find all the employees that work in a specific category, exemple iPhone.
SELECT e.empName
FROM Employee e
WHERE e.catID IN ( SELECT c.catID 
		   FROM Categories c
		   WHERE c.catName = 'iPhone' )

-- e2. Find all categories that are being available in 2 different stores, exemple Paris or Dublin.
-- used: OR
SELECT c.catName
FROM Categories c
WHERE c.catID IN ( SELECT e.catID 
		   FROM Employee e
		   WHERE e.empID IN ( SELECT w.empID 
				      FROM Work_In w
				      WHERE w.stoID IN ( SELECT s.stoID 
						   	 FROM Stores s
						   	 WHERE stoLoc = 'Paris' OR stoLoc = 'Dublin' ))) 

-- f1. Find all product that are already ordered, without NULL rates and increase their rate after customers influenced it.
-- used: arithmetic expression in SELECT clause
-- used: condition in the WHERE clause with AND
SELECT proID, p.proName, proRate + 5 AS proNewRate 
FROM Products p
WHERE proRate IS NOT NULL AND EXISTS ( SELECT * FROM Orders o
				       WHERE o.proID = p.proID )

-- f2. Find all Customers that have ordered not in 2022-10-19.
 -- used: condition in the WHERE clause with NOT/ AND
SELECT c.cusName
FROM Customers c
WHERE EXISTS ( SELECT * FROM Orders o
	       WHERE o.cusID = c.cusID AND NOT o.ordDate = '2022-10-19' )

-- g1. Find the product that is red and has Pro model, than multiply the rate to 5, because is going to be the best rated product.
-- used: arithmetic expression in SELECT clause
-- used: condition in the WHERE clause with NOT/ AND
SELECT p.proName, p.proRate * 5 AS proNewRate 
FROM ( SELECT * FROM Products P
       WHERE NOT P.colID IN (2, 6) AND P.modID = 11 ) p 

-- g2. Find all customers, except that ones who ordered in 2022-12-01, and change their phone number to correct form.
-- used: arithmetic expression in SELECT clause
-- used: NOT
SELECT c.cusName, c.cusPhoneNr + 100000000 AS cusNewPhoneNr 
FROM ( SELECT * FROM Customers C
       WHERE C.cusID IN ( SELECT o.cusID 
			  FROM Orders o
			  WHERE NOT o.ordDate = '2022-12-01' )) c 

-- h1. Find how many models are available for all categories.
-- used: COUNT
SELECT m.modName, COUNT(*) modCount
FROM Model m
GROUP BY m.modName

-- h2. Find the minimum from all the total working hours per employee.
-- used: the HAVING clause
-- used: a subquery in the HAVING clause
-- used: SUM/ MIN
SELECT e.empName, SUM(e.empWork) AS empTotalHours 
FROM Employee e
GROUP BY e.empName
HAVING SUM(e.empWork) = ( SELECT MIN(w.E)
			  FROM ( SELECT SUM(e1.empWork) E
				 FROM Employee e1
				 GROUP BY e1.empName ) w )

-- h3. Find all products with rate greater than 2.
-- used: the HAVING clause
-- used: SUM
SELECT p.proName, SUM(p.proRate) AS proTotalRate
FROM Products p
GROUP BY p.proName
HAVING 2 < SUM(p.proRate)
ORDER BY p.proName

-- h4. Find the average number of salaries for each employee job and the maximum salary from that category.
-- used: the HAVING clause
-- used: a subquery in the HAVING clause
-- used: AVG/ MAX/ COUNT
SELECT e.empJob, AVG(e.empSalary) AS empAvgSalary, MAX(e.empSalary) AS empMaxSalary
FROM Employee e
GROUP BY e.empJob
HAVING 1 < ( SELECT COUNT(e2.empJob)
	     FROM Employee e2
	     WHERE e.empJob = e2.empJob )

-- i1. Find all employee which have salary bigger than the least salary from category Sales Associate or Cleaning & Maintenance.
-- used: ANY
-- used: ORDER BY
SELECT e.*
FROM Employee e
WHERE e.empSalary > ANY ( SELECT e2.empSalary
			  FROM Employee e2
			  WHERE e2.empJob = 'Sales Associate' OR e2.empJob = 'Cleaning & Maintenance' )
ORDER BY e.empSalary DESC

-- i1. Find all employee which have salary bigger than the least salary from category Sales Associate or Cleaning & Maintenance.
-- used: MIN instead of ANY
-- used: ORDER BY
SELECT e.*
FROM Employee e
WHERE e.empSalary > ( SELECT MIN(e2.empSalary)
		      FROM Employee e2
		      WHERE e2.empJob = 'Sales Associate' or e2.empJob = 'Cleaning & Maintenance' )
ORDER BY e.empSalary DESC

-- i2. Find all the descriptions for the recent ordered products.
-- used: ANY 
SELECT p.proName, p.proDescription
FROM Products p
WHERE p.proID = ANY ( SELECT o.proID
		      FROM Orders o
		      WHERE o.ordDate >= '2022-11-02' )

-- i2. Find all the descriptions for the recent ordered products.
-- used: IN instead of ANY 
SELECT p.proName, p.proDescription
FROM Products p
WHERE p.proID IN ( SELECT o.proID
		   FROM Orders o
		   WHERE o.ordDate >= '2022-11-02' )

-- i3. Find all the employee for which the expierence is greater then the ones who are working at iPhone.
-- used: ALL
-- used: ORDER BY
SELECT e.*
FROM Employee e
WHERE e.empExperience > ALL ( SELECT e2.empExperience
			      FROM Employee e2
			      WHERE e2.catID = 3 )
ORDER BY e.empExperience DESC

-- i3. Find all the employee for which the expierence is greater then the ones who are working at iPhone.
-- used: aggreation operator 
-- used: MAX instead of ALL
SELECT e.*
FROM Employee e
WHERE e.empExperience > ( SELECT MAX(e2.empExperience)
			  FROM Employee e2
			  WHERE e2.catID = 3 )
ORDER BY e.empExperience DESC

-- i4. Find all products for a user which is not interested for a MacBook.
-- used: ALL
SELECT p.*
FROM Products p
WHERE p.modID IN ( SELECT m.modID
		   FROM Model m
		   WHERE m.catID <> ALL ( SELECT c.catID
					  FROM Categories c
					  WHERE catID = 1 ))

-- i4. Find all products for a user which is not interested for a MacBook.
-- used: NOT IN instead of ALL
SELECT p.*
FROM Products p
WHERE p.modID IN ( SELECT m.modID
		   FROM Model m
		   WHERE m.catID NOT IN ( SELECT c.catID
					  FROM Categories c
					  WHERE catID = 1 ))
