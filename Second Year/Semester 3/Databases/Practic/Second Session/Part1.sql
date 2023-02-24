USE master 
GO
ALTER DATABASE PracticPart1 
SET single_user WITH ROLLBACK IMMEDIATE
DROP DATABASE PracticPart1

CREATE DATABASE PracticPart1

GO
USE PracticPart1
GO

-- SUBJECT I
CREATE TABLE S (
	SID INT PRIMARY KEY,
	A INT NOT NULL,
	B VARCHAR(100) NOT NULL,
	C INT NOT NULL,
	D INT,
	E INT NOT NULL,
	F INT NOT NULL
);

CREATE TABLE DeleteLog (
	DVal INT,
	EVal INT,
	Fn INT
);

INSERT INTO S(SID, A, B, C, D, E, F) VALUES
(1, 1, 'A-nceput de ieri sa cada', 15, 2, 1, 1),
(2, 2, 'Cate-un fulg, acum a stat,', 15, 1, 2, 1),
(3, 2, 'Norii s-au mai razbunat', 20, NULL, 2, 1),
(4, 1, 'Spre apus, dar stau gramada', 19, NULL, 2, 3),
(5, 1, 'Peste sat.', 29, 25, 2, 3),
(6, 2, 'Nu e soare, dar e bine,', 23, 5, 1, 3),
(7, 2, 'Si pe rau e numai fum.', 15, 2, 1, 1),
(8, 6, 'Vantu-i linistit acum,', 35, 1, 2, 1),
(10, 3, 'Dar navalnic vuiet vine', 15, 1, 2, 2),
(11, 1, 'De pe drum.', 18, 5, 2, 2),
(12, 1, 'Sunt copii. Cu multe sanii,', 15, NULL, 3, 2),
(13, 2, 'De pe coasta vin tipand', 20, 2, 2, 1),
(14, 2, 'Si se-mping si sar razand;', 40, 2, 1, 1)

SELECT * FROM S

-- Exercise 1
SELECT s1.A, COUNT(*) NoR
FROM S s1
WHERE s1.B LIKE '%a%'
GROUP BY s1.A
HAVING COUNT(*) = (SELECT COUNT(*) FROM S s2 WHERE s1.A = s2.A)

-- Exercise 2
SELECT s1.B, COUNT(*)
FROM S s1 RIGHT JOIN S s2 ON s1.SID = s2.C
WHERE s1.SID IS NOT NULL
GROUP BY s1.B

-- Exercise 3
GO
CREATE OR ALTER FUNCTION ufF1(@D INT, @E INT) RETURNS INT
BEGIN 
RETURN (SELECT COUNT(*) FROM S WHERE D = @D AND E = @E)
END
GO

GO
CREATE OR ALTER TRIGGER TrOnDelete 
ON S
FOR DELETE
AS
INSERT DeleteLog(DVal, Eval, Fn)
SELECT d.D, d.E, dbo.ufF1(d.D, d.E) - 1
FROM deleted d
WHERE d.F BETWEEN -1 AND 3
GO

DELETE FROM S WHERE SID BETWEEN 1 AND 100

SELECT * FROM DeleteLog